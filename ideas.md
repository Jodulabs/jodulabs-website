# Jodulabs Website — Design Direction

## Three stylistic approaches

### Theme Name: Editorial Utility
Very brief intro: A refined editorial system for serious construction software: warm paper, precise rules, and a strong typographic voice. It treats the product as a professional instrument rather than a generic SaaS dashboard.
Probability: 0.07

### Theme Name: Field Notes / Site Office
Very brief intro: A tactile field-office aesthetic built from graphite, tracing-paper layers, redline annotations, and documentary construction imagery. It feels practical, human, and rooted in the realities of Indian residential building work.
Probability: 0.04

### Theme Name: Quiet Technical Modernism
Very brief intro: A restrained high-contrast interface with cool mineral tones, modular geometry, and near-invisible motion. It communicates reliability and technical confidence through disciplined structure rather than decoration.
Probability: 0.08

## Chosen approach: Editorial Utility

### Design Movement
Contemporary editorial design blended with Swiss information design and the material language of architectural drawing sets. The site should feel like a beautifully typeset working document: confident, legible, and exact.

### Core Principles
1. **Clarity before decoration.** Every section must explain Jodu's value in a few seconds and make the next action obvious.
2. **Warm precision.** Use generous whitespace, sharp rules, disciplined alignment, and a warm paper palette so technical content feels approachable rather than sterile.
3. **Proof over promises.** The interface should foreground the actual canvas, floor-plan outputs, quantities, and schedules instead of relying on vague marketing language.
4. **Designed for the field.** Respect the workflows of Indian civil engineers, draftspersons, and contractors with direct language, practical examples, and responsive behavior that works on smaller screens.

### Color Philosophy
The base is a warm architectural paper (#F7F3ED) with graphite ink (#25231F), softened by clay (#B85C38) as the ownable signature color. Clay is used sparingly for decisions, annotations, and active states; it should feel like a redline mark made by a skilled professional. Secondary surfaces use sand and limestone tones, while cool blueprints appear only inside product visuals so the interface remains calm and editorial.

### Layout Paradigm
Use an asymmetric editorial column: a narrow index rail or eyebrow on the left, a dominant content column, and a product proof column that interrupts the rhythm. Avoid a repetitive centered-card stack. Sections should alternate between wide visual statements, split narratives, and dense proof modules, with rules carrying the eye across the page.

### Signature Elements
1. A small clay square/line annotation system used for section indices, active navigation, and product callouts.
2. Architectural rule lines and dimension-like labels that make the page feel measured without becoming a blueprint cliché.
3. Product evidence framed like a sheet from a drawing set, with captions that explain what the visitor is seeing.

### Interaction Philosophy
Interactions should feel like manipulating a working document: focused, immediate, and quiet. Buttons compress slightly on press, links reveal a clay rule, product frames lift by a few pixels, and navigation states stay obvious. No interaction should be ornamental or delay the visitor's understanding.

### Animation
Use short, low-amplitude reveals for editorial sections: opacity plus a 12–20px vertical translation, staggered by 45ms. Product images can drift into place with a subtle 1–2px parallax effect on pointer movement, but respect reduced-motion preferences. Avoid looping decorative motion; use a single cursor-like pulse only for the availability/status signal.

### Typography System
Use **Cormorant Garamond** for display headlines and editorial emphasis, with weight 400–500 and restrained italics. Use **DM Sans** for body copy, labels, navigation, buttons, and captions. Headlines should be 56–88px on wide screens with compact line-height; body text should sit around 16–18px with 1.65–1.75 line-height. Labels use 10–11px uppercase lettering with generous tracking. Never use Inter.

### Brand Essence
Jodu is the focused planning instrument for Indian residential construction teams who need one clear place to compose a house and produce the documents that move it forward.
Personality: **Measured, practical, quietly ambitious.**

### Brand Voice
Headlines are direct, specific, and slightly editorial. CTAs describe the real action rather than using generic growth language. Microcopy should sound like a capable colleague who knows the work.

Example lines:
- “One house. One canvas. Every document downstream.”
- “See how a 30 × 40 plot becomes a buildable set.”

### Wordmark & Logo
Use a custom monogram mark built from two offset right angles: one represents the plot boundary and the other the plan's interior logic. The mark should sit beside the Jodu wordmark in Cormorant Garamond, with the final “u” carrying a small clay terminal stroke. The mark must work alone as a favicon and app icon.

### Signature Brand Color
**Jodu Clay — #B85C38.** It is the visual equivalent of a redline annotation on a warm drawing sheet: human, decisive, and unmistakably tied to the product's design-and-build context.

## Implementation reminders

- Keep the project light-theme only and avoid pure white or pure black.
- Use real product screenshots from the repository as proof assets; do not invent customer testimonials, ratings, or reviews.
- Keep all media outside the project directory and reference uploaded asset URLs.
- Add a short style reminder at the top of every CSS, component, and page file touched during the redesign.

## Style Decisions — Sober Product Site

The site is no longer a pitch deck or founder-marketing page. It should behave like a product reference site for a serious technical company. The hierarchy is now: what Jodu is, what it currently does, where it runs, how to see it in action, and where to get it.

Language must be factual and restrained. Remove broad claims, inflated outcomes, urgency, invented proof, and customer-style language. Use product nouns and concrete verbs: plan, compose, review, quantify, schedule, export, download.

The primary proof is a clean demo from Jodu and authentic product screenshots. The website should not imply customers, traction, reviews, or availability that the team has not confirmed. Desktop and Android should be labeled independently, with unreleased platforms clearly marked as coming soon or in development.

Navigation should expose Product, Demo, and Downloads. The Downloads page is a utility page, not a sales page: show platform status, version/release information when available, and clear next actions. The visual system keeps the warm paper and clay accent but reduces decorative framing, hero theatrics, and promotional CTA density.

## Style Decisions — Plans and Product Proof

The Jodu mark reads as two offset architectural right angles, with a small clay terminal detail on the final “u”. The mark is the compact brand signal; it should not drift toward a generic loop or abstract technology symbol.

Jodu Clay is used as a redline annotation system: section squares, status marks, active states, callout rules, and key action cues. It is not a broad decorative wash.

Every major product visual is presented as a labeled drawing-set sheet with a concrete caption for the output shown: canvas, quantities, schedules, or plan sheet. The site uses authentic product captures only.

Plans are intentionally provisional. The homepage may show the shape of access — Pilot, Individual, and Team — but must clearly label unreleased plans and avoid invented prices, limits, or availability. The website stays product-first; “About us” and investor-facing company sections are not part of the default information architecture unless there is real material to add.

## Style Decisions — Platform Notation and Field Context

Jodu, not Jodulabs, is the platform name. A dedicated, low-key notation field may show the name in Kannada, English, Tamil, Telugu, Urdu, and Hindi as a brand layer. It is not a pronunciation guide, a language selector, or a claim that the product has been localised into those languages. The scripts should carry the feel of a drawing-set notation sheet: ordered, quiet, and legible.

Contextual imagery should show the material reality of Indian residential work — a house under construction, masonry, concrete, reinforcement, and site geometry. It functions as a faded documentary underlay and must not be confused with Jodu product output, a customer project, or a polished real-estate image. Treat it with the same restrained palette as the rest of the editorial system: softened, low-saturation, and framed by measured annotation details.

## Style Decisions — Local-Script Logo Lock-Up

This decision supersedes the proposed standalone notation field. The multilingual treatment belongs inside the hero as a background cue: the canonical Jodu mark sits above a single local-script wordmark, which changes slowly between selected scripts. The lock-up never has language labels, borders, cards, or explanatory copy. It should read like a light site stamp caught in the construction texture — visible enough to notice, quiet enough to leave the product proof in charge.

## Style Decisions — Full-Bleed Motion Field

This decision supersedes the placed logo lock-up. The hero should behave like a field of partially seen site material, not a composition with another framed brand component. Under the product copy and plan canvas, the construction image pans very slowly; oversized fragments of the Jodu name in local scripts and the canonical tiled logo each travel on independent paths at low contrast. Nothing is labelled or expected to be read as a translation. The result should feel discovered on a second look, with the content remaining fully legible at the first.

### Refinement: Background stamp and script traces

The motion field must avoid looking like a scatter of unrelated watermarks. It uses a few partially cropped stamps, each pairing the actual Jodu mark with a local-script word beneath it. Their independent, slow movement makes the relationship feel like a field condition while avoiding a formal lock-up or translation board.

## Style Decisions — Technical Construction Atlas

The final atmosphere should not become a visual collage. It uses three muted planes only: a completed Indian house, a house in progress, and a working floor-plan surface. CSS perspective places those planes at different depths, while slow wordmark movement gives the background dimensionality without calling attention to motion. The six Jodu language renderings are present as low-opacity technical traces rather than visible brand units. The site remains a serious technical product reference: construction context is present, but the product proof always leads.

### Interaction refinement

On desktop pointer devices, the atlas responds with a small perspective shift. This is the primary moment of dimensionality: it rewards exploration without adding a feature control, does not move copy or product proof, and is disabled for coarse pointers and reduced-motion preferences.

### Three.js scene refinement

The live scene is an original construction atlas, not a static backdrop. The finished home, build-stage home, and working plan sit on independent planes and drift at different rates. Jodu appears in Kannada, English, Tamil, Telugu, Urdu, and Hindi as partially cropped, low-opacity field traces rather than standalone labels. The animation should be discoverable over several seconds, never demand attention, and leave the hero copy and product proof fully legible.
