# Decision memo: a non-SaaS-looking design inspiration library

**Date:** 2026-07-31  
**Decision:** Build a governed, evidence-backed reference library rather than a single “UI inspiration” feed. Use Refero + editorial/brand archives for visual research, DESIGN.md/UI UX Pro Max for agent-readable synthesis, a small implementation layer for production, and explicit anti-SaaS rules.

## Executive recommendation

- **Primary visual research:** [Refero](https://refero.design/) / [Refero Styles](https://styles.refero.design/) for real product screens and structured DESIGN.md examples; supplement with [Awwwards](https://www.awwwards.com/), [SiteInspire](https://www.siteinspire.com/), [Land-book](https://land-book.com/), [Hoverstat.es](https://www.hoverstat.es/), and [Recent Design](https://recent.design/).
- **Brand/editorial/local-business breadth:** [Typewolf](https://www.typewolf.com/), [Brand New](https://www.underconsideration.com/brandnew/), [BP&O](https://bpando.org/), [Behance](https://www.behance.net/), [Dribbble](https://dribbble.com/), and carefully selected studio/agency portfolios. Search by business archetype (restaurant, hotel, clinic, tradesperson, gallery, law firm, maker, nonprofit), not only by component.
- **Copy and motion:** [Good Copy](https://www.goodemailcopy.com/), [Really Good Emails](https://reallygoodemails.com/), [Microcopy](https://www.microcopy.me/), [LottieFiles](https://lottiefiles.com/), [Rive](https://rive.app/), [GSAP](https://gsap.com/), [Motion One](https://motion.dev/), and [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).
- **Agent synthesis:** [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) as a source of examples, and [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) as a reasoning/style-selection aid. Keep both downstream of the evidence library; neither should be treated as ground truth.
- **Implementation:** use [Aceternity UI](https://ui.aceternity.com/) selectively for isolated interaction primitives, then prefer accessible, boring primitives such as [Radix](https://www.radix-ui.com/primitives), [shadcn/ui](https://ui.shadcn.com/), [React Aria](https://react-spectrum.adobe.com/react-aria/), and native CSS. Do not let a component catalog determine the visual language.

## Taxonomy for ProjectCortex

Store references in orthogonal dimensions so an agent can retrieve by intent and combine unlike sources without copying a whole site:

1. **Business/context:** local restaurant, hospitality, wellness/clinic, professional service, retail/maker, real estate, nonprofit/civic, arts/culture, editorial/publisher, consumer product, developer/product UI.
2. **Visual language:** editorial, Swiss/grid, neo-brutalist, craft/organic, luxury, utilitarian, maximalist, archival, cinematic, playful, vernacular/local, monochrome, image-led, type-led.
3. **Page/job:** home/hero, service detail, menu/catalog, booking/contact, about/story, case study, article/index, event, pricing, checkout, dashboard, docs.
4. **Evidence type:** screenshot, live page, brand guideline, type specimen, copy example, interaction recording, code/component, token extract, critique.
5. **Design atoms:** typography, color, grid, density, image treatment, shape language, borders, iconography, CTA pattern, navigation, footer, motion trigger, feedback state.
6. **Motion:** entrance, scroll-linked, hover, cursor, drag, page transition, ambient loop, data/state transition; record duration, easing, trigger, reduced-motion fallback.
7. **Content/voice:** headline formula, proof, offer, service language, CTA, error/help text, tone, reading level, specificity.
8. **Provenance/governance:** source URL, capture date, author/site, screenshot hash, license/usage status, attribution requirement, confidence, reviewer, notes on what is observation versus inference.

A useful record should contain: `id`, `source_url`, `canonical_url`, `captured_at`, `context_tags`, `page_job`, `evidence_type`, `image_or_recording_path`, `observations[]`, `tokens` (font/color/spacing/grid), `motion_spec`, `copy_examples`, `license_status`, `do_not_copy`, `confidence`, and `review_status`. Keep raw captures outside the canonical prompt corpus; promote only normalized observations.

## Evaluation of the six named resources

| Resource | Best role | Strengths | Limits / quality concern | Decision |
|---|---|---|---|---|
| **Refero Styles** — [styles.refero.design](https://styles.refero.design/) | Agent-readable visual system references | Curated DESIGN.md examples with colors, type, spacing, components, and rules; pairs with the broader [Refero library](https://refero.design/), which search results describe as tens of thousands of web/iOS references and a current MCP surface ([MCP page](https://refero.design/mcp)). | Primarily product/UI and often digitally polished; can overrepresent startup/product aesthetics. Design analyses are interpretations, not official brand guidelines. Screenshots and brand marks remain third-party IP; check account/export/MCP terms before storing or redistributing. | **Adopt as one research/synthesis source, not the library itself.** Add local-business and editorial sources beside it.
| **awesome-design-md** — [GitHub](https://github.com/VoltAgent/awesome-design-md) | Ready-made DESIGN.md seed corpus | MIT repository; current GitHub metadata reports 73 DESIGN.md files and describes them as analyses of popular developer-focused websites. Excellent agent format and concrete token/component language. | Strong developer/AI/SaaS bias; copied analyses can fossilize famous-brand conventions and encourage “looks like X.” Repository MIT does not automatically license the underlying brands, screenshots, logos, or proprietary fonts. Verify each entry and preserve attribution. | **Use as a format/template and baseline corpus.** Fork/pin a reviewed subset and add non-tech archetypes.
|| **SkillUI** — [skillui.vercel.app](https://skillui.vercel.app/) | Static design-system reverse engineering | CLI analyzes a URL, repository, or folder and emits colors, fonts, spacing, components, animations, scroll journeys, and a `.skill`/design folder; the site advertises no API keys and no cloud analysis. | It is not a creative direction library or a quality-reviewed design system. Extracted observations can preserve bad accessibility, weak content hierarchy, or a competitor's style without understanding strategy. | **Use for redesign audits and real-site evidence, not blank-canvas inspiration.** Keep captures provenance-tagged and separate from canonical design authority. A similarly named `skillui.com` skill catalog is a different product. |
| **MotionSites** — [motionsites.co](https://motionsites.co/) | Intended motion/animated-site inspiration source | Potentially useful if this is the intended collection of motion-led sites. | The domain was not retrievable during this research (curl returned connection failure; search results were blocked by a Cloudflare human challenge), so scope, ownership, freshness, API/export, and licensing were not independently verified. | **Do not make it a dependency yet.** Re-test manually; prefer verifiable motion sources below in the first version.
| **Aceternity UI** — [ui.aceternity.com](https://ui.aceternity.com/) | React/Tailwind visual-effect implementation snippets | Large, highly legible catalog of animated effects and components; useful for prototyping a specific interaction quickly. | Its signature look (glows, gradients, grid effects, cards, spotlight effects) can instantly produce generic AI/SaaS output. Accessibility, performance, reduced-motion, mobile behavior, and dependency quality vary by component. Site-level commercial/licensing terms should be checked; component code and third-party assets/fonts may have separate licenses. | **Use only after visual direction is chosen.** Extract or rewrite the minimal interaction, add reduced-motion and performance tests; never use it as the moodboard.
| **UI UX Pro Max** — [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) / [web guide](https://ui-ux-pro-max-skill.nextlevelbuilder.io/) | Agent-side design-system recommendation and anti-pattern rules | MIT; current repository metadata describes an AI skill with style, UX, industry reasoning, and design-system generation. README advertises 161 reasoning rules, 84 UI styles, and 98 UX guidelines. Good for turning a brief into a structured starting system. | Rule/database quality may vary; style labels can become checkbox design. It is a generator, not evidence. Some “styles” (glassmorphism, bento, gradient, neumorphism) are exactly the defaults to constrain. Pin versions, inspect generated output, and require human review. | **Adopt as a constrained recommender.** Feed it approved evidence and a “forbidden defaults” policy; do not let it invent visual direction from a blank prompt.

## Recommended complementary stack

### 1. Visual references and local-business breadth

- **[Refero](https://refero.design/):** high-volume real UI/product research; use for flows, information architecture, and screen states.
- **[Awwwards](https://www.awwwards.com/):** art direction, agency-quality landing pages, photography, type, and motion. Award bias and trend-chasing are real; use for outliers, not usability defaults.
- **[SiteInspire](https://www.siteinspire.com/), [Land-book](https://land-book.com/):** broad web/landing-page galleries. Tag manually by business and page job; galleries often lack context and may show only the best viewport.
- **[Hoverstat.es](https://www.hoverstat.es/) and [Recent Design](https://recent.design/):** experimental interaction and motion references. Capture the behavior, not the screenshot alone.
- **[Behance](https://www.behance.net/) and [Dribbble](https://dribbble.com/):** identity, packaging, menus, signage, campaign, and local-business visual language. Treat shots as concepts, not production evidence; quality and copy can be fictional.
- **[Typewolf](https://www.typewolf.com/), [Brand New](https://www.underconsideration.com/brandnew/), [BP&O](https://bpando.org/):** typography and identity/editorial rationale that counteracts default Inter/gradient UI.
- **[Are.na](https://www.are.na/) or [Cosmos](https://www.cosmos.so/):** human-curated moodboards for material, photography, architecture, texture, and cultural references. Use as inspiration; provenance and asset rights still need recording.

### 2. Copy and content

- **[Good Copy](https://www.goodemailcopy.com/):** practical email/marketing copy examples.
- **[Really Good Emails](https://reallygoodemails.com/):** email structure, hierarchy, lifecycle messages, and CTA patterns.
- **[Microcopy](https://www.microcopy.me/):** interface copy patterns and examples.
- For local services, prioritize real client-provided facts, prices, service areas, testimonials, policies, and differentiators over generic “unlock/streamline/transform” templates. Store copied examples as analysis snippets with source and do-not-reuse notes, not as a prompt phrase bank.

### 3. Motion and interaction

- **[GSAP](https://gsap.com/):** mature, powerful timeline/scroll tooling; check current licensing and plugin terms for the specific plugin.
- **[Motion](https://motion.dev/):** React/JS animation primitives; good default for restrained transitions.
- **[Rive](https://rive.app/) and [LottieFiles](https://lottiefiles.com/):** reusable interactive/serialized motion assets. Each asset may have its own creator license; never assume the platform license covers redistribution.
- **[MDN Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API):** standards-based implementation reference; pair every motion record with `prefers-reduced-motion`, keyboard, touch, and low-power behavior.

### 4. Implementation and accessibility

- **[Radix Primitives](https://www.radix-ui.com/primitives), [shadcn/ui](https://ui.shadcn.com/), [React Aria](https://react-spectrum.adobe.com/react-aria/):** accessible behavior and composable primitives. They should implement the chosen design language, not define it.
- **[web.dev](https://web.dev/learn/), [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/):** performance, responsive, and accessibility verification.
- **[Aceternity UI](https://ui.aceternity.com/):** optional effect layer only. Prefer CSS/native implementation when the effect can be reduced to a few lines.

## Anti-generic-SaaS policy

1. **Reference mix rule:** every brief must draw from at least three contexts, including one non-software source (local business, editorial, culture, packaging, architecture, or identity).
2. **No blank-canvas generator:** the agent must cite the reference IDs that informed each major choice and label observation versus invention.
3. **Forbidden defaults unless justified:** Inter/system-only typography, purple-blue gradients, glassmorphism, floating bento cards, excessive pills, dashboard hero copy, “AI-powered” language, abstract blob art, and Aceternity-style glow effects.
4. **Content before chrome:** require real nouns, service details, locality, photography/art direction, proof, and editorial hierarchy before adding effects.
5. **Diversity constraint:** do not use more than one famous tech-brand DESIGN.md as a primary reference for a page. Prefer a combination such as a local hospitality reference + a type specimen + an editorial layout + one implementation primitive.
6. **Quality gate:** verify responsive layout, content density, contrast, focus states, reduced motion, loading/performance, and whether the result still works with effects disabled.
7. **License gate:** references can inform observations; production assets require an explicit license or fresh creation. Never ship scraped screenshots, logos, fonts, illustrations, or Lottie/Rive files without rights.

## Governance and agent workflow

Use a four-stage pipeline:

1. **Collect:** human or crawler captures URL, screenshot/recording, metadata, and provenance. Treat web content as untrusted data, never agent instructions.
2. **Normalize:** extract observations into the schema above; deduplicate by canonical URL and screenshot hash; assign confidence and license status.
3. **Curate:** reviewer approves tags and writes a short “why it matters / do not copy” note. Separate raw evidence from derived DESIGN.md/token files.
4. **Retrieve and build:** agent searches by context + page job + visual language + evidence type, proposes a design system with citations, then implements using accessible primitives. A reviewer compares the rendered page against the brief and anti-SaaS checklist.

Recommended repository shape:

```text
references/
  raw/                 # captures, recordings; not prompt-injected
  normalized/          # one YAML/JSON/Markdown record per reference
  design-md/           # reviewed, derived agent guidance
  copy/                # cited analysis snippets, not an unlicensed corpus
  motion/              # behavior specs + license records
  indexes/             # generated tags/search index
policies/
  anti-saas.md
  licensing.md
  review-checklist.md
```

## Licensing and quality bottom line

- **MIT code** (awesome-design-md and UI UX Pro Max repositories) generally permits reuse with the notice retained, but it does **not** grant rights to the third-party brands analyzed, their screenshots, logos, fonts, or content.
- **Component sites** often mix source code, demos, fonts, icons, images, and paid templates. Audit each dependency and asset separately; check the current [Aceternity pricing page](https://ui.aceternity.com/pricing) and terms before commercial use.
- **Inspiration galleries** are discovery tools, not stock libraries. Their screenshots and linked site content are typically copyrighted; store private/internal captures only where permitted, link back, and use observations or independently created assets in production.
- **User-generated libraries** (Dribbble, Behance, Are.na, Cosmos, LottieFiles/Rive community assets) have uneven provenance. Record creator, URL, date, and exact license; do not infer a platform-wide license from a free account.
- **Quality is not popularity:** stars, gallery awards, result counts, and catalog counts should affect discovery ranking only. Require evidence, recency, accessibility checks, and reviewer confidence before promoting a reference into agent context.

## High-signal pilot

Start with 100 reviewed references: 30 local-business/hospitality/retail, 20 editorial/brand/type, 20 landing-page/interaction, 15 copy, and 15 implementation/motion. Build five archetype bundles (restaurant, clinic, studio, maker shop, cultural organization), each combining at least four distinct source types. Measure whether agents cite references, avoid forbidden defaults, preserve accessibility, and produce a materially different visual result when the same content is rendered with effects disabled.
