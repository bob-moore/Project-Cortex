---
date: 2026-07-17
description: "Researched HIPAA applicability and web-form requirements for Aalair — likely not a covered entity, but treat form design as HIPAA-conscious anyway. Concrete form-design and hosting recommendations."
prospect: "Aalair Home Care"
tags:
  - work-note
  - prospect
  - prospect/aalair-home-care
---

# Aalair Home Care — HIPAA Requirements

Researched to answer Bob's form-design concern raised on the discovery call ("depending on how you accept insurance affects HIPAA requirements") — see [[Aalair Home Care Needs Analysis]]. This is compliance-adjacent, not legal advice — genuine open questions below need Aalair's own compliance contact, not MWFM.

## Does HIPAA actually apply to Aalair?

**Likely not as a "covered entity" — but treat it as applying anyway, and it may bind them indirectly regardless.**

- Covered-entity status is triggered by conducting standard electronic transactions (billing, claims, eligibility checks) as a healthcare provider, health plan, or clearinghouse. Most non-medical home care agencies (personal care, companionship, non-skilled support) are **not** covered entities, since they don't bill Medicare/Medicaid claims or process medical claims electronically. ([FormAssembly](https://www.formassembly.com/blog/hipaa-for-non-medical-businesses/), [Home Care Marketing Pros](https://help.homecaremarketing.com/en/articles/8975809))
- Aalair's pivot toward private-pay actually *reduces* any covered-entity argument further — private pay with no insurance billing is the cleanest non-covered-entity position.
- **Two things keep HIPAA relevant regardless:**
  - **Business Associate exposure** — if Aalair receives referrals from hospitals/SNFs (covered entities) and handles PHI those entities disclosed for care coordination, Aalair may need a Business Associate Agreement (BAA) with those referral sources, independent of Aalair's own billing model. **Genuinely unresolved — not determinable from the discovery-call transcript.** Confirm directly with Tamra/Don or their compliance advisor.
  - **De facto industry standard** — every home-care-specific compliance resource found (ShiftCare, Home Care Marketing Pros, HIPAA Journal, BridgeCare OS) converges on the same advice: even when not legally a covered entity, agencies handling sensitive care/health details ("my mom has dementia," "we need help after my father's surgery") should treat that data with HIPAA-equivalent care — reputational/business-associate risk, not just legal exposure. ([ShiftCare](https://shiftcare.com/us/blog/hipaa-compliance-in-non-medical-home-care-a-practical-guide))

**Bottom line for planning:** build the form as if HIPAA-conscious handling is required, without asserting Aalair is definitively a covered entity — that determination isn't MWFM's to make, and the safe-default approach costs little extra either way.

## What this means for the contact/intake form

- **Any field capturing a name + a care need/medical condition is potentially PHI-adjacent** in this context — even name + email tied to a submitted care reason.
- **Routing raw submissions to a plain business email inbox (Gmail/Outlook) is explicitly non-compliant** per multiple sources — standard consumer email doesn't meet encryption-at-rest/BAA requirements, and neither Gmail's nor Outlook's free tiers will sign a BAA. ([FormAssembly](https://www.formassembly.com/blog/hipaa-for-non-medical-businesses/))
- **Standard industry mitigation:** keep the public-facing form minimal (name, contact info, general timing/urgency, broad category — not open-text medical detail), and push actual health/care-need specifics into a secured follow-up step (phone call, secured intake portal) rather than a raw public-webform-to-email pipeline.

## WordPress-specific options

Relevant since MWFM's stack typically uses Gravity Forms:

- **Gravity Forms is explicitly NOT HIPAA compliant by default** — confirmed from Gravity Forms' own docs: no encryption at rest, no BAA offered, "we do not host or store your collected form data on your behalf, so we will not sign any such agreement." ([Gravity Forms official docs](https://docs.gravityforms.com/hipaa-and-gravity-forms/))
- **Can be made HIPAA-conscious with add-ons + hosting changes:**
  - Field-level encryption add-ons — e.g. **HIPAA Forms by Code Monkeys** (isolates PHI, offers BAA-covered storage) or **Gravity Forms Encrypted Fields** by PluginOwl. ([Gravity Forms docs](https://docs.gravityforms.com/hipaa-and-gravity-forms/), [CosmicGiant guide](https://cosmicgiant.com/gravity-forms-hipaa/))
  - **HIPAA-compliant hosting with a signed BAA** — named options: Atlantic.Net, Liquid Web, Convesio, HIPAA Vault, Rackspace (HITRUST-certified). Standard shared/managed WP hosting generally won't sign a BAA — a real consideration for the hosting/maintenance quote if full compliance is pursued.
  - SSL/TLS in transit (standard already), role-based WP user permissions, audit logging, documented retention/disposal policy.
- **A BAA requirement, if pursued fully, cascades**: host must sign one, any encryption/storage add-on vendor must sign one, and the email/notification destination must be a HIPAA-compliant inbox (not standard Gmail/Outlook) — real cost/complexity escalation beyond a normal contact-form build.

## Recommendation for Aalair's actual form

Given what Tamra asked for (fast, routes to email, doesn't scare prospects off) and Aalair's likely non-covered-entity status:

1. **Keep the public intake form deliberately shallow**: name, phone/email, general timing (a date range, not open-text), and a broad category dropdown (e.g. "for myself / for a family member," general care type) rather than open-text medical/diagnosis fields. Satisfies Tamra's stated want (more qualifying detail without scaring people off) while minimizing PHI collected on a public form in the first place.
2. **Don't route this to a raw personal Gmail/Outlook inbox.** At minimum, use a properly configured business email (Google Workspace/Microsoft 365's business tiers can support BAAs — confirm which tier before assuming), or route through the same secure step where the deeper "assessment" conversation already happens by phone per Tamra's described process.
3. **Push actual sensitive detail (diagnosis, specific condition, care history) into the human "assessment" call/meeting Tamra already described** — not the web form. Matches her own stated process (form → callback → phone/in-person assessment) and avoids needing full HIPAA-compliant form infrastructure unless Aalair's compliance posture later requires it.
4. **Flag directly to Aalair/their compliance contact**: whether they have (or need) a BAA with any hospital/SNF referral sources — a business-relationship fact MWFM can't verify, not ours to determine.
5. **Upgrade path exists if ever needed**: if Aalair's referral relationships later require full compliance (formal BAA with a referring facility, insurance-adjacent transactions), the Gravity Forms + encryption add-on + BAA-hosting path above is the concrete next step — not worth building now for a form this shallow.

## Genuine open questions (not resolved by this research)

- Whether Aalair currently has (or needs) a BAA via existing hospital/SNF referral relationships — ask Tamra/Don directly, or their compliance advisor.
- Which specific email/hosting tier MWFM would actually configure for this client — an internal MWFM infrastructure decision, not researched here.

## Related

- [[Aalair Home Care Needs Analysis]]
- [[Aalair Home Care AI Feature Suggestions]] — the needs-assessment widget option there has the same PHI/BAA consideration as this form
