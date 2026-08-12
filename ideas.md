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
