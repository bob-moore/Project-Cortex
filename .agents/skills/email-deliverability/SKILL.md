---
name: email-deliverability
description: "Use when auditing or diagnosing email deliverability, inbox placement, sender domain health, SPF, DKIM, DMARC, MX, DNSBL/blacklist status, BIMI, MTA-STS, TLSRPT, sender reputation, or why emails are going to spam. Performs read-only public DNS and reputation checks and produces prioritized fixes without changing DNS, ESP, lists, or sending systems."
---

# Email Deliverability

Use this skill to check whether an email-sending domain is technically able to
reach inboxes.

This is a read-only diagnostic. It never edits DNS, ESP settings, suppression
lists, or sends messages.

## Operating Contract

1. Resolve client, sending domain, sending provider if known, market, and
   symptom.
2. Read Brand, Voice, and Stack when client-specific; Stack may identify ESP,
   DNS host, or known sending domains.
3. Use public DNS/reputation evidence first. Do not request credentials for the
   initial audit.
4. Label each finding as measured, user-provided, estimated, assumed, or
   blocked.
5. Route DNS changes, ESP changes, or platform mutation to the appropriate
   human/platform owner with explicit approval.

## Checks

Run or request evidence for:

- SPF: exactly one record, lookup count, enforcement qualifier.
- DKIM: expected selector records for the sending provider.
- DMARC: policy, alignment, reporting addresses, progression path.
- MX: mail receiver configuration.
- DNSBL/blacklist: public status where reachable.
- Bonus: BIMI, MTA-STS, TLSRPT.
- Sender/domain context: recent provider changes, new domain, volume ramp,
  authentication alignment, complaint/bounce symptoms.

## Command Pattern

Prefer `dig`:

```bash
dig +short TXT example.com
dig +short TXT selector._domainkey.example.com
dig +short TXT _dmarc.example.com
dig +short MX example.com
```

If direct DNS is unavailable, use DNS-over-HTTPS and report that fallback.

## Output

```text
Email Deliverability Audit
Client/Domain:
Method:

Score/Verdict:

Findings:
| Severity | Area | Evidence | Recommendation |

Records Checked:
- SPF:
- DKIM:
- DMARC:
- MX:
- DNSBL:

Approval-Gated Fixes:
- ...
```
