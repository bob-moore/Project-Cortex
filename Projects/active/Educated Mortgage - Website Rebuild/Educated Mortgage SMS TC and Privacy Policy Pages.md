---
date: 2026-07-09
description: "Dev handoff spec: two new pages (SMS Terms & Conditions, Privacy Policy) + footer links, needed for Twilio SMS approval. Content sourced from Dan O'Brien's docx attachments."
project: "Educated Mortgage"
client: "Educated Mortgage"
status: active
quarter: Q3-2026
tags:
  - work-note
  - client/educated-mortgage
---

# Educated Mortgage — SMS T&C + Privacy Policy Pages

## Context

[[Dan O'Brien]] emailed [[Elyse Birkett]] two docx attachments on 2026-07-07 ("EMS website SMS Terms & Conditions.docx", "EMS website Privacy Policy.docx"), forwarded to Bob same day ("Fwd: SMS T&C and Privacy Policy for Educated Mortgage", bob.moore@midwestfamilymadison.com inbox). Requirement: publish as **2 separate pages**, linked in the **footer of every page** — needed for Twilio SMS approval.

Content was not retrievable through the Gmail connector or through Spark (read-only account, attachment download blocked by permissions). Bob pulled the attachments directly and uploaded them 2026-07-09 — content below is the full extracted text, unedited, since this is client-supplied legal/compliance copy for Twilio approval and shouldn't be rewritten.

This is the "Second Iteration — adding new page, app links" line item on the [Website Builds board (Monday.com)](https://mwfcompanies.monday.com/boards/18175047973) ("Educated Mortgage" group, due 2026-07-09) — see [[Educated Mortgage]] Open Items.

## Implementation notes

No live WP access from this session — Novamira is still mid-setup on the local install per [[Educated Mortgage Stack]] ("AI Access (Novamira)"), so page creation has to happen through WP admin directly (or Codex CLI once Novamira is confirmed live). Repo is `themes/canvas` (FSE block theme, no client child theme) at `/Users/bobmoore/Dev/Sites/1202.educatedmortgage.dev`.

Footer is **not** a static template file — `patterns/footer.php` in the repo is still the generic MWF base-theme placeholder (Lorem ipsum, `#` links). The live/staging footer already has real content (Apple/Google Play buttons per [[Educated Mortgage]] open items), which means it's been customized through the Site Editor and lives in the DB, not this file. Add the two new links there, not by editing `patterns/footer.php`.

Suggested slugs:
- **Privacy Policy** → `/privacy` — the SMS T&C doc itself references `https://www.educatedmortgage.com/privacy`, so match that exactly rather than the more conventional `/privacy-policy`.
- **SMS Terms & Conditions** → `/sms-terms-and-conditions` (no existing reference to match, this is a reasonable clean-slug default — confirm with Dan/Elyse if he has a preference).

Footer link labels: reuse "Privacy Policy" (footer pattern already has a placeholder link with this exact label — just needs a real URL) and add "SMS Terms & Conditions" alongside it.

## Page: Privacy Policy (`/privacy`)

**EDUCATED MORTGAGE SERVICES, LLC**
**PRIVACY POLICY**
**Effective Date:** July 2026

### Introduction

Educated Mortgage Services, LLC ("Educated Mortgage," "we," "our," or "us") is committed to protecting your privacy and safeguarding your personal information.

This Privacy Policy explains how we collect, use, disclose, and protect information obtained through our website, online mortgage applications, borrower portal, electronic communications, text messaging, and related services.

If you become a mortgage applicant or customer, you will also receive our separate federal Privacy Notice, which explains how we collect, share, and protect your nonpublic personal information in accordance with the Gramm-Leach-Bliley Act (GLBA).

### Information We Collect

We may collect personal information you voluntarily provide, including:

- Name
- Address
- Email address
- Telephone number
- Date of birth
- Property address
- Loan purpose
- Employment information
- Income information
- Asset information
- Financial information
- Mortgage application information
- Documents uploaded through our borrower portal
- Information submitted through website contact forms

As part of the mortgage process, we may also obtain information from:

- Credit reporting agencies
- Employers
- Financial institutions
- Government agencies
- Mortgage insurance providers
- Title companies
- Appraisal companies
- Investors
- Fraud prevention and identity verification providers
- Other third parties as permitted by law

### Information Collected Automatically

When you visit our website, we may automatically collect information including:

- IP address
- Browser type
- Operating system
- Device information
- Pages viewed
- Time spent on pages
- Referring websites
- Search terms
- Cookies
- Similar tracking technologies

This information helps us improve our website and better serve our customers.

### Cookies & Analytics

Our website may use cookies and similar technologies including:

- Google Analytics
- Google Ads
- Microsoft/Bing Ads
- Meta (Facebook) Pixel
- Website analytics tools
- Advertising conversion tracking

These technologies help us:

- Improve website performance
- Measure advertising effectiveness
- Better understand visitor behavior
- Improve user experience

You may disable cookies through your browser settings; however, some portions of our website may not function properly.

### How We Use Your Information

We may use your information to:

- Respond to inquiries
- Schedule consultations
- Process mortgage applications
- Verify information
- Communicate during the loan process
- Provide mortgage options
- Send educational information
- Provide homeownership resources
- Deliver Home Reports and market updates
- Provide customer service
- Improve our website and services
- Prevent fraud
- Comply with applicable laws and regulations

### SMS Communications

If you consent to receive text messages from Educated Mortgage Services, we may send SMS messages regarding:

- Appointment confirmations
- Appointment reminders
- Loan application updates
- Requests for documentation
- Loan milestone notifications
- Closing reminders
- Customer service communications
- Mortgage education
- Homeownership information
- Mortgage marketing
- Home equity opportunities
- Refinance opportunities
- Other information related to your mortgage needs

Message frequency varies based on your relationship with Educated Mortgage Services. Message and data rates may apply. You may opt out at any time by replying **STOP**. Reply **HELP** for assistance. Your consent to receive SMS messages is not required as a condition of obtaining a mortgage loan or any other service.

### Email Communications

If you provide your email address, we may send:

- Mortgage updates
- Educational information
- Homeownership tips
- Market updates
- Promotional communications
- Customer service communications

Marketing emails include an unsubscribe option. Transactional communications related to your mortgage may continue as necessary.

### AI-Assisted Communications

Educated Mortgage Services may use artificial intelligence ("AI") tools to assist our employees with customer communications, marketing content, document organization, workflow automation, and operational efficiency.

These tools are used to support — not replace — the expertise of our licensed mortgage professionals. Final lending decisions, underwriting determinations, and mortgage advice are provided by qualified personnel and are subject to applicable investor and regulatory guidelines.

### Third-Party Service Providers

To provide mortgage services efficiently, we utilize trusted third-party providers. These providers may include:

- Loan origination systems
- Borrower portal providers
- Customer relationship management (CRM) providers
- Electronic signature providers
- Income and employment verification providers
- Asset verification providers
- Credit reporting agencies
- Mortgage insurance providers
- Title companies
- Appraisal companies
- Investors
- Website hosting providers
- Analytics providers
- Marketing providers
- SMS communication providers
- Home valuation providers
- Mortgage activity monitoring providers

These providers receive only the information necessary to perform services on our behalf and are contractually obligated to protect your information.

### Mobile Information Privacy

**No mobile information will be shared with third parties or affiliates for their own marketing or promotional purposes.**

**All categories above exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties except vendors that provide messaging services on our behalf.**

### Data Security

We maintain administrative, technical, and physical safeguards designed to protect your personal information against unauthorized access, disclosure, alteration, or destruction. These safeguards include:

- Secure computer systems
- Encrypted communications where appropriate
- Access controls
- Secure data storage
- Employee training
- Physical security measures
- Vendor security reviews

While we use commercially reasonable efforts to protect your information, no system can guarantee absolute security.

### Data Retention

We retain personal information for as long as necessary to:

- Provide requested services
- Comply with legal and regulatory requirements
- Resolve disputes
- Enforce agreements
- Meet record retention obligations

### Your Choices

You may:

- Opt out of marketing emails
- Opt out of SMS messages by replying STOP
- Contact us regarding your personal information
- Exercise any privacy rights available under applicable law

Mortgage applicants and customers will also receive our separate federal Privacy Notice describing information-sharing practices and applicable opt-out rights.

### Children's Privacy

Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children.

### Third-Party Websites

Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites.

### Changes to This Privacy Policy

We may update this Privacy Policy periodically. Changes become effective upon posting to this page.

### Contact Us

**Educated Mortgage Services, LLC**
5315 Wall Street, Suite 270
Madison, WI 53718
Phone: (608) 834-5000
Email: info@edumtg.com
Website: [www.educatedmortgage.com](https://www.educatedmortgage.com)

---

## Page: SMS Terms & Conditions (`/sms-terms-and-conditions`)

**EDUCATED MORTGAGE SERVICES, LLC**
**SMS TERMS & CONDITIONS**
**Effective Date:** July 2026

### SMS Messaging Program

By opting in, you agree to receive SMS text messages from Educated Mortgage Services, LLC regarding your mortgage inquiry, loan application, loan process, customer service, educational information, marketing communications, and homeownership resources.

### Types of Messages

Depending on your relationship with Educated Mortgage Services, you may receive text messages regarding:

- Appointment scheduling
- Appointment reminders
- Mortgage consultations
- Loan application updates
- Requests for documentation
- Loan milestone notifications
- Closing reminders
- Customer service communications
- Home buying education
- Mortgage rate updates
- Market updates
- Home equity opportunities
- Refinance opportunities
- Promotional offers
- Other mortgage-related communications

Message frequency varies depending on your activity and communication preferences.

### Opting Out

**You may cancel the SMS service at any time by replying STOP to any message.**

After you send the SMS message "STOP," we will send a confirmation message. After this, you will no longer receive SMS messages from us unless you opt in again.

### Need Assistance?

If you experience issues with our messaging program: reply **HELP**, or contact us directly:

Educated Mortgage Services, LLC
Phone: (608) 834-5000
Email: info@edumtg.com
Website: [www.educatedmortgage.com](https://www.educatedmortgage.com)

### Message & Data Rates

Message frequency varies. Message and data rates may apply for messages sent to you from us and to us from you. Please contact your wireless provider regarding your messaging or data plan.

### Carrier Disclaimer

Mobile carriers are not responsible for delayed or undelivered messages.

### Consent

Your consent to receive SMS messages is **not** a condition of obtaining a mortgage loan or purchasing any goods or services.

### Privacy

Your privacy is important to us. Please review our Privacy Policy: [www.educatedmortgage.com/privacy](https://www.educatedmortgage.com/privacy)

### Supported Devices

SMS delivery depends on your wireless carrier and compatible mobile device. Educated Mortgage Services is not responsible for delays or failures caused by carrier networks or device limitations.

### Changes to SMS Terms

We may modify these SMS Terms & Conditions at any time. Updated versions will be posted on our website with a revised effective date.

### Contact Information

**Educated Mortgage Services, LLC**
5315 Wall Street, Suite 270
Madison, WI 53718
Phone: (608) 834-5000
Email: info@edumtg.com
Website: [www.educatedmortgage.com](https://www.educatedmortgage.com)

## Related

- [[Educated Mortgage]]
- [[Educated Mortgage Stack]]
- [[Dan O'Brien]]
- [[Elyse Birkett]]
- [[Projects/Index|Project Index]]
