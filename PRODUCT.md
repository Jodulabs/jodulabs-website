# Jodu: product knowledge for this website

Register: brand. Write in Indian English, with concrete housing language.

**Positioning verified: 2026-10-20**, against the local product repository's
canonical product context, feature ledgers and frontend entry points. This is
source verification, not confirmation of production deployment or a new store
release. Older release and showcase evidence remains dated below.

## Names and positioning

- **Jodu Labs** is the company, based in India. Contact: contact@jodulabs.com.
  Registered as Jodulabs (OPC) Private Limited, CIN U62011KA2025OPC213343,
  Honavar, Uttara Kannada, Karnataka. Publish the town only, never the street
  address. Member of NVIDIA Inception (not an investment or endorsement).
  Facts shown on the site live in `client/src/company.ts`.
- **Jodu** is the public product name; lowercase `jodu` in the logo.
- **Kalakar** is the internal repository name. Never put it in public copy,
  metadata or alt text.

**Company positioning, confirmed by the founder on 2026-10-20:** Jodu Labs is
building a platform for housing.

**Product category:** A platform for housing.

**Experience:** Imagine, design and agree on a home.

Jodu brings homeowners, designers, civil engineers, contractors and reviewers
around a house. The platform direction spans concepts, professional design,
drawings and estimates, and shared decisions. The coordinated building model
supports the design tools; modelling is no longer the product category or the
company promise. Do not imply construction execution, procurement, payments,
a contractor marketplace or site progress management are available.

Lead with the house, people and decisions. Explain detailed design and document
capabilities as parts of that platform. AI helps explore options and answer
questions; professional control and explicit acceptance remain central.

## People and their work

- **Homeowners:** communicate requirements, explore the design and leave
  feedback. The developing concept experience lets them explore room layouts.
  Homeowner concept exploration is distinct from construction-document authoring.
- **House designers and civil engineers:** turn requirements into exact plans,
  specify materials and finishes, and prepare coordinated documents and estimates.
- **Contractors and builders:** understand the design and quantities. Estimating
  supports editable rates, but do not imply all invited contractors can see or
  change prices. Project access governs this.
- **Reviewers and the wider house team:** the developing membership workflow
  gives them issued revisions and notes, according to their access.

## Current demonstrated capabilities

These are supported by existing product documentation and prior captures, not
new live-production verification during this positioning update.

- Set a plot and setbacks; draw walls and rooms, place doors, windows and
  stairs, and work with dimensions and precision editing tools.
- Support Indian G+1/G+2 professional house design. Masonry includes laterite,
  stone, concrete block, fly-ash, clay and AAC; do not assume every house is brick.
- Specify materials, finishes, parapets, railings, chajjas, compound walls,
  jalis, sun-fins, porches and pitched roofs.
- Review the house in 3D and explore rooms. This is a coordination view, not
  a claim of photorealistic rendering.
- Derive door, window, room, wall, stair, finish, envelope and fixture schedules.
- Produce measured quantities and a priced bill of quantities (BOQ), with
  editable rates, visible assumptions and Indian purchase units such as bags
  and brass. An estimate is not a contractor quotation or agreed contract cost.
- Compose drawing sets with plans, sections, elevations and schedules; export
  PDFs. Output-readiness checks still apply: do not promise automatic approval,
  professional certification or that every project can export without fixes.
- Exchange drawings through DXF (DWG uses a server converter), quantities through
  CSV, and 3D through GLB / IFC. Do not promise every schedule has a standalone
  CSV download. IFC output is documented in the product's feature ledger.
- Attach an existing DWG/DXF as a reference for user-confirmed wall tracing.
  This is not automatic drawing recognition or CAD conversion.
- Share a client presentation link. A viewer captures a view, marks a point and
  leaves a note. The point belongs to that snapshot, not persistent 3D geometry.
  Comments do not automatically edit the design.
- Existing website demos cover Exterior Ideas, finish alternatives and Ask Jodu.
  Exterior Ideas are inspiration images, not measured geometry. Do not present
  a manually authored interior as AI-generated evidence. Ask Jodu answers with
  project sources; the current source also supports bounded finish/facade
  proposals, but the existing demo only proves question answering.

## Developing platform capabilities

Public copy must explicitly label these **In development** until release is
verified. Implementation in a repository is not evidence of public availability.

### Home concepts

The primary audience is a homeowner exploring a home on a phone. Designers can
use the same experience; web provides continuation. The shared editor supports
rooms as movable/resizable pieces, useful dimensions, illustrative 3D, and
AI-assisted sketch refinement. The current integration is still under review.

Sketches are independent of professional projects. Explicitly creating a new
project from a reviewed sketch generates a plan once; later sketch edits do
not change that project. A concept is not a construction-ready design. Do not
promise autonomous end-to-end house generation or that the current public
Android release already contains the concept editor.

### House members, issued revisions and approvals

The new web flow brings a Lead designer, Design assistants, Homeowners,
Contractors and Reviewers into one house project. Administration is separate
from design responsibility. Working-design and price access are per person.
Do not copy the old role matrix in the feature ledger: it lags the canonical
product description and current permission implementation.

The Lead issues a fixed revision with a change summary. Later working edits do
not rewrite it. Notes and explicit homeowner approvals belong to a specific
revision and person. Comparing revisions includes design and quantity changes;
price-authorised people can see estimate differences. An estimate difference
is not an agreed variation; an issue or homeowner approval is not professional
engineering sign-off. This is asynchronous collaboration, not simultaneous
editing. Native mobile Houses is outside this web change.

## Platforms and release claims

Existing availability baseline: 2026-08-13, retained without claiming a new release.

- Browser: app.jodulabs.com is the existing account-based product entry point.
  Do not promise unrestricted/free signup or new production features without
  verification.
- Android: existing Google Play link is
  https://play.google.com/store/apps/details?id=com.jodulabs.jodu.
  Previously demonstrated release: offline field capture, briefs, measurements,
  photos and notes, with reviewed contributions sent to a linked project.
  It does not directly author the professional building model.
- Desktop: in preparation; no public installers or version claims.
- Do not make new macOS, iOS, cloud handoff, pricing or release-date promises.

## Images and evidence

Use committed local assets, never private repository URLs. Keep the existing
brand mark `/brand/jodu-icon.svg`; do not redraw it.

- `/showcase/hero.png` and `laterite-house.glb`: The Gable House, an authored
  40 × 60 ft, ground-plus-first-floor showcase. It is not a built client project.
- Plan, exterior, schedules and estimate screenshots are real product captures.
- ₹45.65 lakh is an illustrative estimate using illustrative rates, not a
  quotation or market price. The detailed capture record is in
  `docs/showcase-evidence.md` (2026-10-07).
- `/showcase/sheets.png` exists in the current site; its later capture provenance
  is not established by the older ledger, which records a strict-export blocker.
  Do not claim the current positioning update verified that export.
- `/product/plan-sheet-30x40-g1-1.png` and `ground-plan-30x40-1.png` are authentic
  output from the separate canonical 30 × 40 ft G+1 reference project.
- `website-*` clips show the existing feature demonstrations. They do not
  demonstrate the new concept editor or issued-revision workflow.
- Mobile images show field capture on a fictional Sharma Residence project.
  Do not label them as the new concept experience.

## Copy rules

1. Position Jodu as a platform for housing; explain capabilities through outcomes.
2. Keep implemented, demonstrated and publicly released claims distinct.
3. No invented customers, testimonials, metrics, prices or time-saving numbers.
4. Keep concepts distinct from professional construction design, and sketches
   distinct from linked/synchronised project geometry.
5. Do not imply structural calculations, MEP, municipal approval, automatic
   CAD recognition or buildings above G+2 in the professional workflow.
6. Do not position against drafting tools. DXF/DWG are exchange formats.
7. Do not use the label BIM or internal architecture terminology in public copy.
8. Keep the page focused. Use real product media and clear development labels;
   do not manufacture screenshots of unfinished features.

## Sources to revisit

Product repository `../kalakar`:

- `docs/context/product.md` (reviewed 2026-10-19)
- `docs/features/sketches.md` (integration in progress 2026-10-20)
- `docs/features/project-members-and-issued-revisions.md` (review 2026-10-20)
- `docs/features/project-authoring-assistant.md`
- `services/frontend/src/App.tsx`, `pages/ProjectHomePage.tsx`,
  `components/projectHome/`, `pages/SketchPage.tsx`

Re-check source and release evidence before promoting a development feature to
an availability claim. Code takes precedence where older prose contradicts it.
