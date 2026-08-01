#!/usr/bin/env python3
"""Run bounded, read-only agent-readiness checks against a website."""
from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parents[3]
CAP = 2 * 1024 * 1024
AI_AGENTS = {"gptbot", "chatgpt-user", "claudebot", "anthropic-ai", "perplexitybot", "google-extended", "bytespider", "ccbot", "amazonbot"}


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def fetch(url: str, accept: str = "*/*", timeout: int = 30) -> dict:
    request = urllib.request.Request(url, headers={"User-Agent": "ProjectCortex-AgentReadiness/1.0", "Accept": accept})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            body = response.read(CAP + 1)
            return {"url": url, "final_url": response.geturl(), "status": response.status, "content_type": response.headers.get("content-type", ""), "headers": {k.lower(): v for k, v in response.headers.items()}, "body": body[:CAP].decode("utf-8", errors="replace"), "truncated": len(body) > CAP, "error": None}
    except urllib.error.HTTPError as exc:
        body = exc.read(CAP).decode("utf-8", errors="replace") if exc.fp else ""
        return {"url": url, "final_url": url, "status": exc.code, "content_type": exc.headers.get("content-type", "") if exc.headers else "", "headers": {k.lower(): v for k, v in exc.headers.items()} if exc.headers else {}, "body": body, "truncated": False, "error": str(exc)}
    except Exception as exc:  # noqa: BLE001
        return {"url": url, "final_url": url, "status": None, "content_type": "", "headers": {}, "body": "", "truncated": False, "error": str(exc)}


def check(cid: str, category: str, status: str, summary: str, source: str, recommendation: str | None = None, applicable: bool = True, evidence_label: str = "observed-page") -> dict:
    return {"id": cid, "category": category, "status": status, "summary": summary, "source_ref": source, "recommendation": recommendation, "applicable": applicable, "evidence_label": evidence_label}


def robots_data(text: str) -> tuple[list[str], set[str], bool, bool]:
    sitemaps, agents, ai_found, wildcard_disallow = [], set(), False, False
    current: list[str] = []
    for raw in text.splitlines():
        line = raw.split("#", 1)[0].strip()
        if not line or ":" not in line:
            continue
        key, value = [part.strip() for part in line.split(":", 1)]
        low_key, low_value = key.lower(), value.lower()
        if low_key == "sitemap" and value:
            sitemaps.append(value)
        elif low_key == "user-agent":
            current = [low_value]
            agents.add(low_value)
            if low_value in AI_AGENTS:
                ai_found = True
        elif low_key == "disallow" and low_value == "/" and "*" in current:
            wildcard_disallow = True
    return sitemaps, agents, ai_found, wildcard_disallow


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--target", required=True, help="Site URL")
    ap.add_argument("--output-dir", required=True)
    ap.add_argument("--timeout", type=int, default=30)
    args = ap.parse_args()
    target = args.target.rstrip("/") + "/"
    root = Path(args.output_dir).expanduser().resolve()
    raw = root / "raw" / "agent-readiness"
    normalized = root / "normalized"
    raw.mkdir(parents=True, exist_ok=True)
    normalized.mkdir(parents=True, exist_ok=True)
    started = now()
    homepage = fetch(target, "text/html, text/markdown;q=0.9, */*", args.timeout)
    markdown = fetch(target, "text/markdown", args.timeout)
    robots_url = urljoin(target, "/robots.txt")
    robots = fetch(robots_url, "text/plain", args.timeout)
    sitemap_urls, agents, ai_found, wildcard_disallow = robots_data(robots["body"])
    if not sitemap_urls:
        sitemap_urls = [urljoin(target, "/sitemap.xml")]
    sitemap_results = [fetch(url, "application/xml, text/xml;q=0.9, */*", args.timeout) for url in sitemap_urls[:10]]
    checks: list[dict] = []
    checks.append(check("robots", "discoverability", "pass" if robots["status"] == 200 and "text/plain" in robots["content_type"] else "fail", f"robots.txt returned {robots['status']} with content type {robots['content_type'] or 'unknown'}.", robots_url, "Publish a valid robots.txt at the site root." if robots["status"] != 200 else None))
    valid_sitemaps = [item for item in sitemap_results if item["status"] == 200 and "xml" in item["content_type"].lower()]
    checks.append(check("sitemap-discovery", "discoverability", "pass" if valid_sitemaps else "fail", f"Found {len(valid_sitemaps)} valid XML sitemap response(s) from robots.txt or fallback discovery.", robots_url, "Declare and serve the canonical XML sitemap from robots.txt." if not valid_sitemaps else None))
    link_header = homepage["headers"].get("link", "")
    checks.append(check("link-headers", "discoverability", "pass" if link_header else "needs-improvement", "Homepage response includes Link headers." if link_header else "No Link response header was observed on the homepage.", target, "Consider Link headers for machine-discoverable API or service documentation." if not link_header else None))
    checks.append(check("markdown-negotiation", "agent-content", "pass" if "text/markdown" in markdown["content_type"].lower() else "needs-improvement", f"Accept: text/markdown returned {markdown['status']} with {markdown['content_type'] or 'unknown'}.", target, "Provide Markdown content negotiation while keeping HTML as the browser default." if "text/markdown" not in markdown["content_type"].lower() else None))
    checks.append(check("ai-bot-policy", "bot-policy", "pass" if robots["status"] == 200 and not wildcard_disallow else "needs-improvement", "Wildcard crawler policy permits access; AI-specific rules were observed." if ai_found and not wildcard_disallow else "Wildcard crawler policy permits access; no AI-specific user-agent rules were observed." if robots["status"] == 200 and not wildcard_disallow else "Wildcard robots policy blocks all crawlers.", robots_url, "Confirm crawler policy and document intentional AI bot controls." if wildcard_disallow else None))
    signals = re.findall(r"content-signal\s*:", robots["body"], flags=re.I)
    checks.append(check("content-signals", "bot-policy", "pass" if signals else "needs-improvement", "Content-Signal directives were observed in robots.txt." if signals else "No Content-Signal directives were observed in robots.txt.", robots_url, "Add Content-Signal directives only if the site's content-use policy requires them." if not signals else None))
    endpoints = {
        "llms-txt": "/llms.txt",
        "api-catalog": "/.well-known/api-catalog",
        "oauth-discovery": "/.well-known/openid-configuration",
        "oauth-resource": "/.well-known/oauth-protected-resource",
        "auth-md": "/auth.md",
        "mcp-server-card": "/.well-known/mcp/server-card.json",
        "agent-skills-index": "/.well-known/agent-skills/index.json",
    }
    for cid, path in endpoints.items():
        result = fetch(urljoin(target, path), "application/json, text/markdown, text/plain, */*", args.timeout)
        applicable = cid not in {"api-catalog", "oauth-discovery", "oauth-resource", "auth-md", "mcp-server-card", "agent-skills-index"}
        checks.append(check(cid, "agent-discovery" if cid != "llms-txt" else "agent-content", "pass" if result["status"] == 200 else "needs-improvement" if applicable else "not-applicable", f"{path} returned {result['status']}.", result["url"], f"Publish {path} if this site offers the corresponding agent/API capability." if result["status"] != 200 and applicable else None, applicable=applicable))
    checks.append(check("webmcp", "agent-discovery", "not-assessed", "WebMCP requires rendered browser instrumentation and was not assessed by this HTTP-only pass.", target, "Use Lighthouse or a browser probe when WebMCP is in scope.", applicable=False, evidence_label="blocked"))
    checks.append(check("commerce-protocols", "commerce", "not-applicable", "No commerce capability was declared for this audit target.", target, applicable=False, evidence_label="assumed"))
    completed = now()
    payload = {"version": 1, "tool": {"id": "agent-readiness", "version": "1.0", "official_sources": ["https://isitagentready.com/"]}, "run": {"approval_class": "external_read", "command_intent": "Run bounded HTTP agent-readiness checks.", "command_redacted": "python3 .agents/tools/seo/agent-readiness.py --target <redacted> --output-dir <evidence>", "started_at": started, "completed_at": completed}, "scope": {"mode": "agent-readiness", "client_or_project": None, "targets": [args.target], "market": None, "date_range": None}, "data_status": "complete", "artifacts": [{"path": "raw/agent-readiness/", "kind": "raw-http-evidence", "description": "Bounded responses and headers for agent-readiness endpoints."}], "limits": [f"Each response is capped at {CAP} bytes.", "HTTP-only checks do not prove rendered WebMCP or browser agent behavior.", "Emerging protocols are informational and not SEO or ranking guarantees."], "findings": checks, "verification": ["Response status and content types were recorded for each check.", "Sitemap discovery follows robots.txt declarations before fallback testing.", "Run the report composer to calculate domain status and recommendation rollup."]}
    (raw / "responses.json").write_text(json.dumps({"homepage": homepage, "markdown": markdown, "robots": robots, "sitemaps": sitemap_results}, indent=2) + "\n", encoding="utf-8")
    output = normalized / "agent-readiness.json"
    output.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    try:
        display_output = str(output.relative_to(ROOT))
    except ValueError:
        display_output = str(output)
    print(json.dumps({"data_status": "complete", "output": display_output, "finding_count": len(checks), "valid_sitemaps": len(valid_sitemaps)}, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
