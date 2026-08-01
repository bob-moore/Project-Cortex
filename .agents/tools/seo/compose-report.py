#!/usr/bin/env python3
"""Compose a summary-first, multi-domain website audit report."""
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[3]
SEVERITY_RANK = {"critical": 0, "high": 1, "medium": 2, "low": 3, "info": 4}
PRIORITY = {"critical": "P0", "high": "P1", "medium": "P2", "low": "P3", "info": "P3"}


def load(path: Path, default=None):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return default


def severity_from_status(status: str) -> str:
    return {"fail": "high", "needs-improvement": "medium", "blocked": "medium"}.get(status, "info")


def domain_status(findings: list[dict], blocked: bool = False) -> str:
    if blocked and not findings:
        return "not-assessed"
    if any(item.get("severity") in {"critical", "high"} for item in findings):
        return "fail"
    if any(item.get("severity") in {"medium", "low"} for item in findings):
        return "needs-improvement"
    return "pass"


def packet_findings(packet: dict | None) -> list[dict]:
    return list((packet or {}).get("findings") or [])


def add_finding(target: list[dict], fid: str, severity: str, summary: str, source: str, recommendation: str | None = None, label: str = "observed-page", affected: list[str] | None = None):
    item = {"id": fid, "severity": severity, "summary": summary, "source_ref": source, "recommendation": recommendation, "evidence_label": label}
    if affected:
        item["affected_targets"] = affected
    target.append(item)


def display_source(source: str) -> str:
    if not source or "://" in source:
        return source
    try:
        return str(Path(source).resolve().relative_to(ROOT))
    except (OSError, ValueError):
        return source


def register_review_artifact(home: Path, output: Path, target: str, generated_date: str) -> None:
    """Add a durable Home review link without duplicating an existing entry."""
    if not home.exists():
        return
    try:
        relative = output.resolve().relative_to(ROOT).with_suffix("")
    except ValueError:
        return
    link_target = str(relative).replace("\\", "/")
    host = urlsplit(target).netloc or target
    label = f"Website audit — {host} — {generated_date} — needs review"
    entry = f"- [[{link_target}|{label}]] — `needs-review` — Review the executive summary and priority recommendations; then set the source note's `attention_status` to `reviewed`, `dismissed`, or `converted`."
    content = home.read_text(encoding="utf-8")
    if f"[[{link_target}|" in content:
        return
    anchor = "## Quick Links"
    block = f"## Review Queue\n\n{entry}\n\n"
    if anchor in content:
        content = content.replace(anchor, block + anchor, 1)
    else:
        content = content.rstrip() + "\n\n" + block
    home.write_text(content, encoding="utf-8")


def read_siteone(path: Path) -> tuple[list[dict], dict]:
    report = load(path, {}) or {}
    findings: list[dict] = []
    stats = report.get("stats", {})
    statuses = stats.get("countByStatus", {}) or {}
    count_404 = int(statuses.get("404", 0) or 0)
    redirects = len((report.get("tables", {}).get("redirects", {}) or {}).get("rows", []) or [])
    security_rows = (report.get("tables", {}).get("security", {}) or {}).get("rows", []) or []
    critical_security = sum(int(str(row.get("critical") or 0) or 0) for row in security_rows if isinstance(row, dict))
    warning_security = sum(int(str(row.get("warning") or 0) or 0) for row in security_rows if isinstance(row, dict))
    affected_404 = [str(row.get("url") or row.get("urlPathAndQuery") or "") for row in ((report.get("tables", {}).get("404", {}) or {}).get("rows", []) or []) if isinstance(row, dict)]
    if count_404:
        add_finding(findings, "web-quality-broken-urls", "high", f"{count_404} HTTP 404 response(s) were observed in the bounded crawl.", "raw/siteone-crawler/report.json", "Repair, remove, or intentionally redirect the affected internal targets.", "crawl-output", affected_404[:25])
    if redirects:
        add_finding(findings, "web-quality-internal-redirects", "medium", f"{redirects} redirect record(s) were observed in the bounded crawl.", "raw/siteone-crawler/report.json", "Update internal links to final canonical URLs where practical.", "crawl-output")
    if critical_security or warning_security:
        add_finding(findings, "web-quality-response-security", "high" if critical_security else "medium", f"SiteOne reported {critical_security} critical and {warning_security} warning security-response finding(s).", "raw/siteone-crawler/report.json", "Verify effective CDN/origin configuration before changing response policies.", "crawl-output")
    return findings, report


def read_lighthouse(path: Path) -> tuple[list[dict], dict]:
    report = load(path, {}) or {}
    findings: list[dict] = []
    categories = report.get("categories", {})
    audits = report.get("audits", {})
    perf = categories.get("performance", {}).get("score")
    if isinstance(perf, (int, float)) and perf < 0.9:
        lcp = audits.get("largest-contentful-paint", {}).get("numericValue")
        detail = f"Lighthouse performance score was {perf:.2f}"
        if isinstance(lcp, (int, float)):
            detail += f" with LCP {lcp / 1000:.1f}s"
        add_finding(findings, "web-quality-performance", "medium", detail + ".", "raw/lighthouse/lighthouse.report.json", "Address the highest-impact asset, script, font, and rendering opportunities, then rerun the same profile.", "observed-page")
    for audit_id, label in (("errors-in-console", "browser console errors"), ("image-size-responsive", "responsive image sizing")):
        audit = audits.get(audit_id, {})
        if audit.get("score") == 0:
            add_finding(findings, f"web-quality-{audit_id}", "medium", f"Lighthouse reported an issue with {label}.", "raw/lighthouse/lighthouse.report.json", "Inspect the detailed Lighthouse audit evidence.", "observed-page")
    return findings, report


def read_pa11y(path: Path) -> list[dict]:
    payload = load(path, [])
    if not isinstance(payload, list):
        return []
    findings: list[dict] = []
    for issue in payload[:25]:
        if not isinstance(issue, dict):
            continue
        code = str(issue.get("code") or "pa11y-issue")
        message = str(issue.get("message") or "Pa11y reported an accessibility issue.")
        selector = str(issue.get("selector") or "")
        detail = message + (f" Selector: {selector}." if selector else "")
        add_finding(findings, f"accessibility-pa11y-{code.replace('.', '-').replace(' ', '-')}", "medium", detail, "raw/pa11y/report.json", "Review the affected element in a rendered verification pass; automated accessibility output is partial evidence.", "automated-scan")
    return findings


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--evidence-root", required=True)
    ap.add_argument("--output", default=None)
    args = ap.parse_args()
    root = Path(args.evidence_root).expanduser().resolve()
    output = Path(args.output).expanduser().resolve() if args.output else root / "summary.md"
    site_findings, siteone = read_siteone(root / "raw/siteone-crawler/report.json")
    lighthouse_findings, lighthouse = read_lighthouse(root / "raw/lighthouse/lighthouse.report.json")
    site_findings.extend(packet_findings(load(root / "normalized/gap-headers.json", {})))
    seo: list[dict] = []
    for filename in ["gap-sitemap-discovery.json", "gap-sitemap.json", "gap-schema.json", "gap-images.json", "gap-hreflang.json", "gap-robots.json", "gap-metadata.json"]:
        packet = load(root / "normalized" / filename)
        for item in packet_findings(packet):
            seo.append(item)
    agent = load(root / "normalized/agent-readiness.json", {}) or {}
    agent_findings: list[dict] = []
    for item in packet_findings(agent):
        if not item.get("applicable", True) or item.get("status") in {"pass", "not-applicable"}:
            continue
        agent_findings.append({**item, "severity": severity_from_status(item.get("status", "needs-improvement"))})
    a11y: list[dict] = []
    a11y_score = (lighthouse.get("categories", {}).get("accessibility", {}) or {}).get("score")
    if isinstance(a11y_score, (int, float)) and a11y_score < 1:
        add_finding(a11y, "accessibility-lighthouse-score", "medium", f"Lighthouse accessibility score was {a11y_score:.2f}; automated checks are partial evidence only.", "raw/lighthouse/lighthouse.report.json", "Review the failed accessibility audits and verify representative user paths manually.", "automated-scan")
    for audit_id in ("color-contrast", "image-alt", "label", "link-name", "heading-order", "target-size"):
        audit = lighthouse.get("audits", {}).get(audit_id, {})
        if audit.get("score") == 0:
            add_finding(a11y, f"accessibility-{audit_id}", "medium", audit.get("title", f"Lighthouse reported a {audit_id} issue."), "raw/lighthouse/lighthouse.report.json", "Review the affected nodes and verify the correction in a rendered check.", "automated-scan")
    a11y.extend(read_pa11y(root / "raw/pa11y/report.json"))
    domains = {
        "SEO": (seo, domain_status(seo)),
        "Web Quality": (site_findings + lighthouse_findings, domain_status(site_findings + lighthouse_findings)),
        "Accessibility": (a11y, domain_status(a11y)),
        "Agent Readiness": (agent_findings, domain_status(agent_findings)),
    }
    all_findings = []
    for domain, (findings, _) in domains.items():
        for item in findings:
            all_findings.append({**item, "domain": domain})
    recommendations = []
    seen: set[str] = set()
    for item in sorted(all_findings, key=lambda value: (SEVERITY_RANK.get(value.get("severity", "info"), 4), value.get("summary", ""))):
        rec = item.get("recommendation")
        if not rec or rec in seen:
            continue
        seen.add(rec)
        recommendations.append({"priority": PRIORITY.get(item.get("severity", "info"), "P3"), "domain": item["domain"], "recommendation": rec, "evidence": display_source(item.get("source_ref", "")), "summary": item.get("summary", "")})
    target = ((siteone.get("options") or {}).get("url") or (siteone.get("crawler") or {}).get("hostname") or "target site")
    generated_at = datetime.now(timezone.utc)
    generated_date = generated_at.date().isoformat()
    overall = "fail" if any(status == "fail" for _, status in domains.values()) else "needs-improvement" if any(status == "needs-improvement" for _, status in domains.values()) else "pass"
    lines = ["---", f"date: {generated_date}", f"description: \"Summary-first bounded website audit for {target}.\"", "tags:", "  - generated", "  - audit", "  - review", "attention_status: needs-review", "attention_type: review", "attention_owner: User", f"attention_date: {generated_date}", "attention_priority: normal", "next_action: \"Review the executive summary and priority recommendations; then reconcile the review status.\"", "---", "", "# Website Audit Report", "", "## Executive Summary", "", f"- Target: `{target}`", f"- Generated: `{generated_at.isoformat()}`", "- Scope: bounded SiteOne crawl, Lighthouse homepage lab evidence, Pa11y homepage accessibility evidence, deterministic SEO gap checks, and HTTP agent-readiness checks.", "- Overall status: **" + overall.replace("-", " ").title() + "**", "", "This report is summary-first. It separates SEO, web quality, shallow accessibility, and agent readiness. Scores from external providers are retained as provider evidence, not merged into the ProjectCortex verdict.", "", "External coverage comparison is retained in `external-comparison.json`.", "", "## Status Dashboard", "", "| Area | Status | Key finding |", "|---|---|---|"]
    for domain, (findings, status) in domains.items():
        key_item = sorted(findings, key=lambda value: SEVERITY_RANK.get(value.get("severity", "info"), 4))[0] if findings else {}
        key = key_item.get("summary", "No material findings observed.")
        lines.append(f"| {domain} | **{status.replace('-', ' ').title()}** | {key} |")
    lines += ["", "## Priority Recommendations", ""]
    if recommendations:
        for item in recommendations:
            lines += [f"### {item['priority']} — {item['recommendation']}", f"- Domain: {item['domain']}", f"- Evidence: `{item['evidence']}`", f"- Observed reason: {item['summary']}", ""]
    else:
        lines += ["No recommendations were generated from the retained evidence.", ""]
    lines += ["## Positive Signals", "", "- Raw and normalized evidence are retained under this evidence root.", "- Sitemap discovery follows robots.txt declarations before fallback testing.", "- Agent/API and commerce checks are treated as not applicable when the target does not expose those capabilities.", "- Automated accessibility evidence is not presented as compliance proof.", "", "## Detailed Breakdown", ""]
    for domain, (findings, status) in domains.items():
        lines += [f"### {domain} — {status.replace('-', ' ').title()}", ""]
        if not findings:
            lines += ["No material findings recorded.", ""]
            continue
        for item in findings:
            lines += [f"- **{item.get('severity', 'info').upper()}** `{item.get('id', 'finding')}` — {item.get('summary', '')}", f"  - Evidence: `{display_source(item.get('source_ref', ''))}`", f"  - Label: `{item.get('evidence_label', 'observed-page')}`"]
            if item.get("recommendation"):
                lines.append(f"  - Recommendation: {item['recommendation']}")
        lines.append("")
    lines += ["## Limitations", "", "- The crawl and checks are bounded and sampled; this is not a complete inventory of every URL or state.", "- Lighthouse values are lab evidence for the recorded profile, not field Core Web Vitals.", "- Accessibility checks are automated and shallow; no legal or full WCAG conformance claim is made.", "- Agent-readiness checks are protocol/readiness observations, not proof of AI visibility, citations, traffic, or agent success.", "- Production changes, CMS changes, submissions, paid APIs, and credentials were not used.", "", "## Evidence Index", "", "- `external-comparison.json`", "- `raw/siteone-crawler/`", "- `raw/lighthouse/`", "- `raw/pa11y/`", "- `raw/agent-readiness/`", "- `normalized/`", ""]
    output.write_text("\n".join(lines), encoding="utf-8")
    register_review_artifact(ROOT / "Home.md", output, target, generated_date)
    print(json.dumps({"output": str(output.relative_to(ROOT)), "overall": overall, "recommendation_count": len(recommendations), "domains": {name: status for name, (_, status) in domains.items()}}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
