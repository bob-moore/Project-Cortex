#!/usr/bin/env python3
"""Run bounded, evidence-first SEO gap checks on site artifacts."""

from __future__ import annotations

import argparse
import json
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[3]
MODES = {"headers", "hreflang", "images", "metadata", "robots", "schema", "sitemap", "sitemap-discovery"}


class PageParser(HTMLParser):
    """Collect only the HTML elements required by the selected checks."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.images: list[dict[str, str]] = []
        self.links: list[dict[str, str]] = []
        self.meta: list[dict[str, str]] = []
        self.jsonld: list[str] = []
        self.title: str = ""
        self._in_title = False
        self._script_type: str | None = None
        self._script_data: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key.lower(): value or "" for key, value in attrs}
        if tag.lower() == "img":
            self.images.append(values)
        if tag.lower() == "link":
            self.links.append(values)
        if tag.lower() == "meta":
            self.meta.append(values)
        if tag.lower() == "title":
            self._in_title = True
        if tag.lower() == "script" and values.get("type", "").lower() == "application/ld+json":
            self._script_type = values["type"]
            self._script_data = []

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data
        if self._script_type:
            self._script_data.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "title":
            self._in_title = False
        if tag.lower() == "script" and self._script_type:
            self.jsonld.append("".join(self._script_data))
            self._script_type = None
            self._script_data = []


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def display_path(path: Path) -> str:
    """Prefer vault-relative paths while retaining valid external paths."""
    try:
        return str(path.relative_to(ROOT))
    except ValueError:
        return str(path)


def load_target(target: str, timeout: int) -> tuple[str, str, dict[str, str]]:
    parsed = urlparse(target)
    if parsed.scheme in {"http", "https"}:
        request = urllib.request.Request(target, headers={"User-Agent": "ProjectCortex-SEO-GapCheck/1.0"})
        with urllib.request.urlopen(request, timeout=timeout) as response:
            data = response.read(10 * 1024 * 1024 + 1)
            if len(data) > 10 * 1024 * 1024:
                raise ValueError("target exceeded the 10 MiB read cap")
            headers = {key: value for key, value in response.headers.items()}
            return data.decode("utf-8", errors="replace"), response.geturl(), headers
    path = Path(target).expanduser().resolve()
    if not path.is_file():
        raise ValueError(f"target is not a file or http(s) URL: {target}")
    data = path.read_bytes()
    if len(data) > 10 * 1024 * 1024:
        raise ValueError("target exceeded the 10 MiB read cap")
    return data.decode("utf-8", errors="replace"), str(path), {}


def finding(fid: str, severity: str, label: str, summary: str, source: str, recommendation: str | None = None, affected_targets: list[str] | None = None) -> dict:
    item = {
        "id": fid,
        "severity": severity,
        "evidence_label": label,
        "summary": summary,
        "source_ref": source,
        "recommendation": recommendation,
    }
    if affected_targets is not None:
        item["affected_targets"] = affected_targets
    return item


def count_phrase(count: int, singular: str, plural: str | None = None) -> str:
    word = singular if count == 1 else (plural or f"{singular}s")
    return f"{count} {word}"


def maybe_siteone_report(text: str) -> dict | None:
    try:
        value = json.loads(text)
    except json.JSONDecodeError:
        return None
    if isinstance(value, dict) and isinstance(value.get("tables"), dict):
        return value
    return None


def meta_value(parser: PageParser, key: str) -> str:
    key = key.lower()
    for item in parser.meta:
        if item.get("name", "").lower() == key or item.get("property", "").lower() == key:
            return item.get("content", "").strip()
    return ""


def check_sitemap(text: str, source: str) -> list[dict]:
    findings: list[dict] = []
    try:
        root = ET.fromstring(text)
    except ET.ParseError as exc:
        return [finding("sitemap-invalid-xml", "high", "observed-page", f"Sitemap XML could not be parsed: {exc}", source, "Fix the XML and rerun the sitemap check.")]

    def local(tag: str) -> str:
        return tag.rsplit("}", 1)[-1]

    kind = local(root.tag)
    entries = []
    for element in root.iter():
        if local(element.tag) in {"url", "sitemap"}:
            loc = next((child.text.strip() for child in element if local(child.tag) == "loc" and child.text), "")
            entries.append(loc)
    missing = sum(1 for value in entries if not value)
    duplicates = len(entries) - len({value for value in entries if value})
    if kind not in {"urlset", "sitemapindex"}:
        findings.append(finding("sitemap-unexpected-root", "medium", "observed-page", f"Unexpected sitemap root element: {kind}.", source))
    if not entries:
        findings.append(finding("sitemap-no-entries", "info", "observed-page", "No sitemap URL entries were observed; this is not proof that the site has no indexable URLs.", source))
    if missing:
        findings.append(finding("sitemap-missing-loc", "high", "observed-page", f"{missing} sitemap entr{'y' if missing == 1 else 'ies'} have no loc value.", source))
    if duplicates:
        findings.append(finding("sitemap-duplicate-loc", "medium", "observed-page", f"{duplicates} duplicate sitemap loc entr{'y' if duplicates == 1 else 'ies'} were observed.", source))
    findings.append(finding("sitemap-inventory", "info", "observed-page", f"Parsed {len(entries)} {kind} entr{'y' if len(entries) == 1 else 'ies'}.", source))
    return findings


def check_schema(text: str, source: str) -> list[dict]:
    parser = PageParser()
    parser.feed(text)
    findings: list[dict] = []
    types: list[str] = []
    invalid = 0
    for index, payload in enumerate(parser.jsonld, start=1):
        try:
            value = json.loads(payload)
        except json.JSONDecodeError:
            invalid += 1
            findings.append(finding(f"schema-invalid-jsonld-{index}", "high", "observed-page", f"JSON-LD script {index} is not valid JSON.", f"{source}#jsonld-{index}", "Validate the JSON-LD syntax before implementation review."))
            continue
        nodes = value if isinstance(value, list) else [value]
        for node in nodes:
            if isinstance(node, dict):
                raw_type = node.get("@type")
                if isinstance(raw_type, list):
                    types.extend(str(item) for item in raw_type)
                elif raw_type:
                    types.append(str(raw_type))
    if not parser.jsonld:
        findings.append(finding("schema-no-jsonld-observed", "info", "observed-page", "No JSON-LD script was observed in the supplied HTML; other structured-data forms were not evaluated.", source))
    elif not invalid:
        findings.append(finding("schema-jsonld-parsed", "info", "observed-page", f"Parsed {len(parser.jsonld)} JSON-LD script{'s' if len(parser.jsonld) != 1 else ''}; observed types: {', '.join(sorted(set(types))) or 'none declared'}.", source))
    return findings


def check_metadata(text: str, source: str) -> list[dict]:
    report = maybe_siteone_report(text)
    if report:
        rows = report.get("tables", {}).get("seo", {}).get("rows", [])
        title_targets = []
        description_targets = []
        noindex_targets = []
        denied_targets = []
        for row in rows if isinstance(rows, list) else []:
            if not isinstance(row, dict):
                continue
            target = str(row.get("urlPathAndQuery") or row.get("url") or source)
            title = str(row.get("title") or "")
            description = str(row.get("description") or "")
            indexing = str(row.get("indexing") or "").lower()
            robots_index = str(row.get("robotsIndex") or "")
            if title and (len(title) < 10 or len(title) > 60):
                title_targets.append(target)
            if description and (len(description) < 50 or len(description) > 160):
                description_targets.append(target)
            if robots_index == "0" or "noindex" in indexing:
                noindex_targets.append(target)
            if str(row.get("deniedByRobotsTxt") or "").lower() == "true":
                denied_targets.append(target)
        findings: list[dict] = []
        if title_targets:
            title_summary = "has a title" if len(title_targets) == 1 else "have titles"
            findings.append(finding("metadata-title-length-exceptions", "low", "crawl-output", f"{count_phrase(len(title_targets), 'crawled page')} {title_summary} outside the 10-60 character review band.", source, "Inspect the affected titles before editing; length alone is not snippet quality proof.", title_targets[:25]))
        if description_targets:
            description_summary = "has a meta description" if len(description_targets) == 1 else "have meta descriptions"
            findings.append(finding("metadata-description-length-exceptions", "low", "crawl-output", f"{count_phrase(len(description_targets), 'crawled page')} {description_summary} outside the 50-160 character review band.", source, "Inspect the affected descriptions before editing; length alone is not snippet quality proof.", description_targets[:25]))
        if noindex_targets:
            findings.append(finding("metadata-noindex-observed", "medium", "crawl-output", f"{count_phrase(len(noindex_targets), 'crawled page')} {'is' if len(noindex_targets) == 1 else 'are'} marked noindex.", source, "Confirm each noindex directive is intentional.", noindex_targets[:25]))
        if denied_targets:
            findings.append(finding("metadata-robots-denied-pages", "medium", "crawl-output", f"{count_phrase(len(denied_targets), 'crawled page')} {'was' if len(denied_targets) == 1 else 'were'} reported as denied by robots.txt.", source, "Confirm that blocked crawl paths match the site's indexation policy.", denied_targets[:25]))
        findings.append(finding("metadata-siteone-inventory", "info", "crawl-output", f"Inspected {count_phrase(len(rows) if isinstance(rows, list) else 0, 'SiteOne SEO table row')}.", source))
        return findings

    parser = PageParser()
    parser.feed(text)
    title = " ".join(parser.title.split())
    description = meta_value(parser, "description")
    robots = meta_value(parser, "robots").lower()
    canonical = next((link.get("href", "") for link in parser.links if link.get("rel", "").lower() == "canonical"), "")
    findings = []
    if not title:
        findings.append(finding("metadata-title-missing", "high", "observed-page", "No HTML title was observed in the supplied page.", source, "Add a truthful page title before treating this page as SEO-ready."))
    elif len(title) < 10 or len(title) > 60:
        findings.append(finding("metadata-title-review-length", "low", "observed-page", f"Observed title length is {len(title)} characters, outside the 10-60 character review band.", source, "Review the title for SERP fit; do not edit for length alone."))
    if not description:
        findings.append(finding("metadata-description-missing", "medium", "observed-page", "No meta description was observed in the supplied page.", source, "Add a truthful summary if this page is intended for search snippets."))
    elif len(description) < 50 or len(description) > 160:
        findings.append(finding("metadata-description-review-length", "low", "observed-page", f"Observed meta description length is {len(description)} characters, outside the 50-160 character review band.", source, "Review the description for snippet fit; do not edit for length alone."))
    if "noindex" in robots:
        findings.append(finding("metadata-noindex-observed", "medium", "observed-page", "A robots meta directive includes noindex.", source, "Confirm this exclusion is intentional."))
    if not canonical:
        findings.append(finding("metadata-canonical-missing", "low", "observed-page", "No canonical link was observed in the supplied page.", source, "Add or confirm canonical policy for indexable pages."))
    findings.append(finding("metadata-inventory", "info", "observed-page", f"Observed title {'present' if title else 'missing'}, description {'present' if description else 'missing'}, canonical {'present' if canonical else 'missing'}, robots meta {'present' if robots else 'missing'}.", source))
    return findings


def check_images(text: str, source: str) -> list[dict]:
    parser = PageParser()
    parser.feed(text)
    findings: list[dict] = []
    missing_alt = sum(1 for image in parser.images if "alt" not in image)
    empty_alt = sum(1 for image in parser.images if "alt" in image and not image["alt"].strip())
    missing_dimensions = sum(1 for image in parser.images if not image.get("width") or not image.get("height"))
    if missing_alt:
        findings.append(finding("images-missing-alt", "medium", "observed-page", f"{missing_alt} image element{'s' if missing_alt != 1 else ''} omit an alt attribute.", source, "Review each image's purpose and add truthful alternative text where appropriate."))
    if empty_alt:
        findings.append(finding("images-empty-alt", "low", "observed-page", f"{empty_alt} image element{'s' if empty_alt != 1 else ''} use an empty alt attribute; this may be intentional for decorative images.", source))
    if missing_dimensions:
        findings.append(finding("images-missing-dimensions", "low", "observed-page", f"{missing_dimensions} image element{'s' if missing_dimensions != 1 else ''} omit width or height attributes; layout impact was not measured.", source))
    findings.append(finding("images-inventory", "info", "observed-page", f"Observed {len(parser.images)} image element{'s' if len(parser.images) != 1 else ''}.", source))
    return findings


def check_robots(text: str, source: str) -> list[dict]:
    findings: list[dict] = []
    sitemaps: list[str] = []
    user_agents: set[str] = set()
    current_agents: list[str] = []
    blocks_all = False
    for lineno, raw_line in enumerate(text.splitlines(), start=1):
        line = raw_line.split("#", 1)[0].strip()
        if not line or ":" not in line:
            continue
        key, value = [part.strip() for part in line.split(":", 1)]
        key_l = key.lower()
        value_l = value.lower()
        if key_l == "sitemap" and value:
            sitemaps.append(value)
        elif key_l == "user-agent":
            current_agents = [value_l]
            user_agents.add(value_l)
        elif key_l == "disallow" and value == "/" and "*" in current_agents:
            blocks_all = True
            findings.append(finding("robots-global-disallow", "high", "observed-page", "robots.txt declares User-agent: * with Disallow: /.", f"{source}#L{lineno}", "Confirm this site is intentionally blocked from general crawlers before treating SEO checks as complete."))
    if not sitemaps:
        findings.append(finding("robots-no-sitemap-declared", "low", "observed-page", "No Sitemap directive was observed in robots.txt.", source, "Confirm the canonical sitemap location through platform config, Search Console, or another durable source."))
    else:
        findings.append(finding("robots-sitemap-inventory", "info", "observed-page", f"Observed {len(sitemaps)} Sitemap directive{'s' if len(sitemaps) != 1 else ''}.", source, affected_targets=sitemaps[:25]))
    findings.append(finding("robots-inventory", "info", "observed-page", f"Observed {len(user_agents)} user-agent group{'s' if len(user_agents) != 1 else ''}; global block {'present' if blocks_all else 'not observed'}.", source))
    return findings


def check_sitemap_discovery(text: str, source: str, timeout: int, raw_dir: Path) -> list[dict]:
    """Follow robots.txt sitemap declarations before testing the conventional fallback."""
    declared: list[str] = []
    for raw_line in text.splitlines():
        line = raw_line.split("#", 1)[0].strip()
        if ":" not in line:
            continue
        key, value = [part.strip() for part in line.split(":", 1)]
        if key.lower() == "sitemap" and value:
            declared.append(value)
    if not declared:
        parsed = urlparse(source)
        base = f"{parsed.scheme}://{parsed.netloc}" if parsed.scheme and parsed.netloc else source
        declared = [base.rstrip("/") + "/sitemap.xml"]
    findings: list[dict] = []
    for index, target in enumerate(declared[:10], start=1):
        try:
            body, final_source, headers = load_target(target, timeout)
            content_type = headers.get("content-type", "")
            (raw_dir / f"discovered-{index}.xml").write_text(body, encoding="utf-8")
            findings.append(finding("sitemap-discovered-url", "info", "observed-page", f"Discovered sitemap URL returned HTTP 200 with content type {content_type or 'unknown'}.", final_source, affected_targets=[target]))
            findings.extend(check_sitemap(body, final_source))
        except Exception as exc:  # noqa: BLE001
            findings.append(finding("sitemap-discovered-check-failed", "high", "assumed", f"Discovered sitemap URL could not be fetched: {exc}", target, "Confirm the sitemap URL in robots.txt and serve valid XML with HTTP 200."))
    findings.append(finding("sitemap-discovery-inventory", "info", "observed-page", f"Inspected {len(declared[:10])} sitemap URL(s) from robots.txt or the conventional fallback.", source, affected_targets=declared[:10]))
    return findings


def parse_header_text(text: str) -> dict[str, str]:
    headers: dict[str, str] = {}
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or ":" not in line:
            continue
        key, value = line.split(":", 1)
        headers[key.strip().lower()] = value.strip()
    return headers


def check_headers(text: str, source: str, response_headers: dict[str, str] | None = None) -> list[dict]:
    report = maybe_siteone_report(text)
    if report:
        rows = report.get("tables", {}).get("security", {}).get("rows", [])
        findings: list[dict] = []
        for row in rows if isinstance(rows, list) else []:
            if not isinstance(row, dict):
                continue
            header = str(row.get("header") or "unknown-header")
            critical = int(str(row.get("critical") or "0") or 0)
            warning = int(str(row.get("warning") or "0") or 0)
            if not critical and not warning:
                continue
            severity = "high" if critical else "medium"
            count = critical or warning
            findings.append(finding(f"headers-siteone-{header.lower().replace(' ', '-').replace('_', '-')}", severity, "crawl-output", f"SiteOne reported {count} response{'s' if count != 1 else ''} with {'critical' if critical else 'warning'} security-header findings for {header}.", source, str(row.get("recommendation") or "Verify effective response headers before remediation.")))
        findings.append(finding("headers-siteone-inventory", "info", "crawl-output", f"Inspected {len(rows) if isinstance(rows, list) else 0} SiteOne security header row{'s' if not isinstance(rows, list) or len(rows) != 1 else ''}.", source))
        return findings

    observed = {key.lower(): value for key, value in (response_headers or {}).items()} or parse_header_text(text)
    if not observed:
        return [finding("headers-unavailable", "info", "observed-page", "No HTTP response headers were available in the supplied target.", source, "Run this mode against an approved URL, raw header text, or crawler report.")]
    required = {
        "strict-transport-security": "high",
        "content-security-policy": "high",
        "x-content-type-options": "medium",
        "referrer-policy": "medium",
        "permissions-policy": "medium",
    }
    findings = []
    for header, severity in required.items():
        if header not in observed:
            findings.append(finding(f"headers-missing-{header}", severity, "observed-page", f"Response headers do not include {header}.", source, "Verify at the CDN/origin layer before planning remediation."))
    findings.append(finding("headers-inventory", "info", "observed-page", f"Observed {len(observed)} response header{'s' if len(observed) != 1 else ''}.", source, affected_targets=sorted(observed)[:25]))
    return findings


def check_hreflang(text: str, source: str) -> list[dict]:
    parser = PageParser()
    parser.feed(text)
    alternates = [link for link in parser.links if "alternate" in link.get("rel", "").lower() and link.get("hreflang")]
    findings: list[dict] = []
    codes = [link["hreflang"].lower() for link in alternates]
    duplicates = len(codes) - len(set(codes))
    missing_href = sum(1 for link in alternates if not link.get("href"))
    if not alternates:
        findings.append(finding("hreflang-none-observed", "info", "observed-page", "No hreflang alternate links were observed; this is not a defect without an international targeting requirement.", source))
    if duplicates:
        findings.append(finding("hreflang-duplicate-code", "medium", "observed-page", f"{duplicates} duplicate hreflang language-region code{'s' if duplicates != 1 else ''} were observed.", source))
    if missing_href:
        findings.append(finding("hreflang-missing-href", "high", "observed-page", f"{missing_href} hreflang link{'s' if missing_href != 1 else ''} omit href values.", source))
    if alternates:
        findings.append(finding("hreflang-inventory", "info", "observed-page", f"Observed hreflang codes: {', '.join(codes)}.", source))
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=sorted(MODES), required=True)
    parser.add_argument("--target", required=True, help="Local file or http(s) URL")
    parser.add_argument("--output-dir", default=None, help="Evidence root")
    parser.add_argument("--timeout", type=int, default=30)
    args = parser.parse_args()
    started = now()
    approval = "external_read" if urlparse(args.target).scheme in {"http", "https"} else "read_only"
    root = Path(args.output_dir).expanduser().resolve() if args.output_dir else ROOT / "reviews/evidence/seo" / f"{started[:10]}-gap-{args.mode}"
    raw_dir = root / "raw" / f"gap-{args.mode}"
    normalized_dir = root / "normalized"
    raw_dir.mkdir(parents=True, exist_ok=True)
    normalized_dir.mkdir(parents=True, exist_ok=True)
    source = args.target
    response_headers: dict[str, str] = {}
    try:
        text, source, response_headers = load_target(args.target, args.timeout)
        (raw_dir / "input.txt").write_text(text, encoding="utf-8")
        if response_headers:
            (raw_dir / "response-headers.json").write_text(json.dumps(response_headers, indent=2) + "\n", encoding="utf-8")
        checks = {"sitemap": check_sitemap, "schema": check_schema, "images": check_images, "hreflang": check_hreflang, "metadata": check_metadata, "robots": check_robots}
        if args.mode == "headers":
            findings = check_headers(text, source, response_headers)
        elif args.mode == "sitemap-discovery":
            findings = check_sitemap_discovery(text, source, args.timeout, raw_dir)
        else:
            findings = checks[args.mode](text, source)
        status = "complete"
        error = None
    except Exception as exc:  # noqa: BLE001
        findings = [finding(f"{args.mode}-check-failed", "high", "assumed", str(exc), source)]
        status = "blocked"
        error = str(exc)
    completed = now()
    metadata = {"mode": args.mode, "target": args.target, "source": source, "approval_class": approval, "started_at": started, "completed_at": completed, "error": error}
    (raw_dir / "run-metadata.json").write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    artifacts = [{"path": display_path(raw_dir / "input.txt") if (raw_dir / "input.txt").exists() else display_path(raw_dir), "kind": "raw-input", "description": "Local or fetched source inspected by the gap checker."}, {"path": display_path(raw_dir / "run-metadata.json"), "kind": "run-metadata", "description": "Target, approval class, timing, and errors."}]
    if (raw_dir / "response-headers.json").exists():
        artifacts.append({"path": display_path(raw_dir / "response-headers.json"), "kind": "raw-headers", "description": "HTTP response headers observed during the approved fetch."})
    packet = {
        "version": 1,
        "tool": {"id": f"seo-gap-{args.mode}", "version": "1.0", "official_sources": []},
        "run": {"approval_class": approval, "command_intent": f"Run the {args.mode} SEO gap check.", "command_redacted": f"python3 .agents/tools/seo/gap-check.py --mode {args.mode} --target <redacted>", "started_at": started, "completed_at": completed},
        "scope": {"mode": args.mode if args.mode not in {"sitemap", "robots", "headers", "metadata", "sitemap-discovery"} else "technical-audit", "client_or_project": None, "targets": [args.target], "market": None, "date_range": None},
        "data_status": status,
        "artifacts": artifacts,
        "limits": ["Input is capped at 10 MiB.", "Checks are structural evidence and heuristics, not ranking or compliance guarantees.", "No schema generation or external mutation is performed."],
        "findings": findings,
        "verification": ["Input source and check mode are recorded.", "Raw input and run metadata were preserved when the source could be read.", "Run seo-quality-gate before treating findings as ready."]
    }
    output = normalized_dir / f"gap-{args.mode}.json"
    output.write_text(json.dumps(packet, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"data_status": status, "output": display_path(output), "finding_count": len(findings)}, indent=2))
    return 0 if status == "complete" else 1


if __name__ == "__main__":
    sys.exit(main())
