# Jodu — product knowledge for this website

**Purpose.** This file is the source of truth for anyone (human or agent) writing
copy for jodulabs.com. The product source code lives in a separate private repo
that this repo has no access to, so **everything a website author needs about the
product is written down here.** Do not invent product facts. If a claim is not in
this file, it does not go on the site.

**Last verified against the product repo:** 2026-08-13.

---

## 1. Names

| Name | Use |
|---|---|
| **Jodu** | The product's public name. Always lowercase-in-logo, "Jodu" in prose. |
| **Jodu Labs** | The company. `Jodulabs` in domains and repos. |
| **Kalakar** | **Internal codebase name only. Never publish it.** It is the name of the private repo and appears in internal build artifacts. It must not appear in website copy, alt text, or metadata. |

Contact: `hello@jodulabs.com`. Company location: India.

---

## 2. What Jodu is

Jodu is a **building modeller for the Indian house**.

You compose one coordinated model — plot, walls, rooms, openings, stair,
finishes, envelope, materials — and Jodu produces the floor plans, schedules,
quantities, and the priced bill of quantities from it. The model is the work;
everything else is a view of it. Deliberately narrowed to the **G+1 / G+2 RCC
house**, in the masonry that house is actually built in — see §4, "Build it in
the masonry your region uses".

One-line positioning: *One model. Every deliverable, in step.*

**Product promise:** take a construction-literate professional from plot and
rough program to a credible, signed-off IS 962 floor-plan PDF — with the
schedules and the priced bill of quantities already agreeing with it — without
taking professional control away.

### Who it is for

Indian **civil engineers, structural draftspersons, and technically-literate
contractors** who are responsible for residential houses and stand behind the
output — the professional who designs, specifies, and submits G+1 / G+2 homes
and needs every deliverable to agree with the others.

It is **not** a homeowner self-design tool. Do not write copy aimed at end
homeowners.

### The core idea to communicate

Jodu holds the house as a **single building model**. Plans, schedules,
quantities, the bill of quantities, and the 3D view are all *views* of that one
model. Edit the model and every view follows. Consistency is the architecture,
not a step you remember to run.

Internally the authoring frame is called **House-First Authoring**: a
professional may record requirements in **Program**, explore optional schematic
alternatives in **Concepts**, and author exact construction geometry in
**Plans**. Program and Concepts are aids, not gates — drawing walls and placing
rooms directly are first-class entry points on the same canvas.

---

## 3. Platforms and availability — accurate status

This is the section most likely to be wrong on the site. Read it carefully.

| Surface | Technology | Real status (2026-08-13) | Safe public wording |
|---|---|---|---|
| **Browser app** | React 19 + FastAPI backend, deployed at `app.jodulabs.com` (frontend on Render, backend on `api.jodulabs.com` via Kamal) | **Live and running.** Account-based: sign-up, email verification, and password reset flows exist. This is the surface where the product actually runs today. | "Jodu runs in the browser at app.jodulabs.com." Before writing anything about *open* sign-up, confirm with Jodu Labs whether registration is open or invite-only. |
| **Desktop** | Tauri v2 shell around the same React frontend + a packaged Python runtime sidecar with a local SQLite database | **Built by CI, not publicly released.** Debian x86_64 `.deb` and Windows x86_64 NSIS `.exe` are produced by the packaging workflow. **The Windows installer is unsigned** and is internal-testing only. macOS arm64 is build-ready but intentionally held until Apple Developer ID signing and notarization are set up. | "Desktop app in preparation" / "releasing soon". Do **not** publish download links or version numbers yet. Do not promise macOS. |
| **Android** | Flutter | **On the Google Play internal testing track.** Package `com.jodulabs.jodu`, app name "Jodu". Store listing assets (icon, feature graphic, six phone screenshots, description) are prepared. Not on public Play Store. | "Android companion app in internal testing" or "in development". Do not link to a Play Store page. |
| **iOS** | Flutter | App icons exist in the repo; **there is no iOS build or release pipeline.** | Say nothing about iOS. |

**Desktop is not the first release surface.** Site copy that implies the desktop
build is where Jodu starts is wrong — the browser app is live now and the
desktop build is the one still in preparation.

### Desktop ↔ cloud handoff — do not advertise yet

There is a `.jodu` package format and a lease-based handoff (one write authority
at a time, compare-and-swap push). **The backend is implemented but the UI is not
mounted**, so it is API-only today. Desktop projects are currently local to the
computer; moving work between web and desktop is a manual Import/Export of a
model JSON, which does **not** create a live link or sync. Keep this off the
website until the UI ships.

---

## 4. What Jodu can do — shipped and safe to claim

Everything in this section is implemented and exercised by the product.

### Compose the house the way it is built
Set the plot, road side, and setbacks, and see the buildable envelope. Draw
exterior and interior walls, place typed rooms with live areas and names, and
add doors, windows, and a stair that read correctly in plan. Dimension
everything for the sheet. Precision tools — **Offset, Trim, Extend,
Corner-close, Mirror, Match-properties, Array** — work together on one canvas.

### Build it in the masonry your region uses
Walls are not assumed to be brick. A wall names its masonry unit explicitly, and
the catalogue is India-first, **coastal laterite first**:

- **Laterite block** 390×190×190
- **Random rubble stone masonry**
- Solid and hollow **concrete block** 390×190×190
- **Fly-ash brick** 230×110×75
- **Modular clay brick** 190×90×90 and **traditional clay brick** 230×115×75
- **AAC block** 600×200×200 (thin-bed)

Wall presets ship for these, including **Laterite exposed 200 mm** and
**Laterite plastered 230 mm** alongside the brick and block presets, with real
laterite texturing in the 3D view. Unit counts, mortar, and plaster in the
take-off follow the unit the wall actually names — a laterite wall is costed as
laterite, not as brick with a different label.

**Laterite stone masonry foundations** are modelled properly too: a wall-hosted
masonry foundation with one or more stepped width/depth courses, resolving
excavation, PCC bed, laterite masonry, mortar, and backfill from one shared
physical profile across plan, section, schedules, quantities, and BoQ. It is
never quietly reclassified as an RCC strip footing, and if the masonry material
or stepped profile is missing, Jodu says so rather than falling back to
concrete.

> This matters for coastal Karnataka and Kerala work and is a genuine
> differentiator. Do not write copy that assumes a brick house.

### Specify materials and finishes
Author the materials the building is made of and a finish-schedule **cascade**
that resolves from project → room type → space → surface. Jodu knows what every
surface is finished in and carries that through every deliverable.

### Model the envelope
Parapets, railings, chajjas, compound walls, jalis, sun-fins, porches, and
pitched roofs are modelled elements that flow into schedules and quantities
alongside the rest of the building.

### Schedules straight from the model
Door, window, room, wall, stair, finish, envelope, and fixture schedules come
live from the model — auto-numbered and grouped by type.

### Quantity take-off and a priced BoQ
A live take-off covers masonry, mortar, masonry-unit counts, plaster and paint
areas, slab and stair concrete, structural members, foundations (pad, combined,
strip, raft, with excavation, PCC, backfill, formwork, waterproofing and RCC),
steel estimate, finish areas, envelope elements, and openings.

It rolls up into a **priced bill of quantities**: an editable rate book,
GST-inclusive costs, and a **material statement in contractor purchase units** —
cement in bags, sand and aggregate in **brass** (1 brass = 100 cft ≈ 2.832 m³),
priced in ₹. Every rate and assumption is shown openly and is the user's to set.
CSV export for estimating.

> This is India-first detail and it is a genuine differentiator. Earlier draft
> copy hedged "priced BoQ" as unshipped — that hedge is **stale**. Pricing has
> landed.

### Submission-ready drawings
Compose a **Drawing Set** — A3, A2, or A1 — with floor plans, sections,
elevations, schedules, and the BoQ, and export a clean **IS-962-style PDF with a
title block**, ready for municipal submission and contractor handoff. The saved
Drawing Set workspace previews the actual server-rendered PDF page in-app using
the same renderer as the export, so what you see is what exports.

### 3D verification and exploration
View the same model in 3D to coordinate massing, plus a **House Overview** and a
click-to-glide **Explore** mode with drag-to-look, collision-safe room and door
traversal, automatic operable doors, direct room/floor jumps, and an expandable
position/view-cone map.

**Honesty rule: the 3D view is a massing and coordination aid, not a
presentation render. Never call it photorealistic and never imply it replaces a
visualisation tool.**

### Exchange, and starting from a drawing you already have
Export **DXF** with properly separated layers (WALLS, OPENINGS, STAIRS, SPACES,
GRID, COLUMNS, DIMENSIONS, TITLE). **DWG** export works through an external
converter on the server.

An existing DWG/DXF drawing can also be attached to a project as a **reference
for user-directed wall tracing**: the professional frames and aligns the
drawing, confirms the two visible faces of each wall, and Jodu stages the
derived centreline through ordinary native wall authoring.

**Honesty rule: this is not automatic drawing interpretation, not conversion,
and not an importer.** It is an adoption path where the user confirms every
wall. Copy must not suggest "bring in your DWG and get a model".

### Mobile field companion (internal testing)
The Android app is an **offline-first field companion**, not an authoring tool:

- **House briefs** — record rooms, requirements, and notes before a plan is drawn
- **Site visits** — record measurements, readings, and observations on the spot
- **Photos** attached to the right place, offline
- **Voice notes** via on-device dictation
- **Location and orientation** — tilt-compensated true-north heading and
  directional slope, computed on-device with local magnetic declination, plus a
  reciprocal-sighting check for site-local magnetic distortion
- **3D review** of the project model on the phone

Work happens offline and syncs later. A House Brief captured on the phone
arrives as an **attributed contribution** that a professional reviews and
explicitly applies — **the phone never mutates the building model directly.**

Play Store listing copy currently in use (mirror its tone, don't contradict it):

> Jodu is the field companion for your building projects. Take it to the site and
> capture everything that matters […] Built for architects, builders, and site
> teams who need one simple place to record what they see and review what they're
> building.

---

## 5. What Jodu deliberately does not do

State these plainly if asked; never imply otherwise.

- **No black-box AI layout generation.** Every default — wall thickness, finish,
  dimension, material, rate — is visible, named, and changeable. A suggestion or
  preview never silently becomes authored project truth.
- **Buildings above G+2** are out of scope.
- **Curved / non-rectilinear plans** are out of scope.
- **MEP drawings** and **structural calculations** are out of scope.
- **Real-time multi-user collaboration** is out of scope.
- **Photorealistic rendering** is out of scope.
- **Homeowner self-design flows** are out of scope.
- **Automatic recognition of floors, walls, openings or rooms from an existing
  drawing**, and automatic conversion of a drawing into a model, are out of
  scope.

### Features that exist but must stay off the site (not user-ready)

- Desktop ↔ cloud lease handoff and the `.jodu` package (UI not mounted).
- The facade catalogue **curator bench** (development-only tooling).
- Program & Concepts and the authoring assistant are implemented but still in
  internal review — describe them softly if at all, as part of the workflow
  rather than as headline features.

---

## 6. Product artifacts — what a user actually gets out

| Artifact | Format | Notes |
|---|---|---|
| Floor plan | PDF, per storey | A3 (297×420) or A2 (420×594), scale 1:20 to 1:500, IS-962-style with title block |
| Floor plan | DXF | Layered geometry, for downstream drawing work |
| Floor plan | DWG | Via an external converter on the server |
| Drawing Set | Multi-page PDF | A3 / A2 / A1, ordered sheets: plans, sections, elevations, schedules, BoQ |
| Cost estimate | PDF | Priced BoQ abstract, material statement (bags/brass), measurement appendix, rate basis, assumptions |
| Quantities / BoQ | CSV | For estimating workflows |
| Schedules | In-app + on sheets | Door, window, room, wall, stair, finish, envelope, fixture |
| 3D model | GLB | Verification-grade shell preview |
| Project transfer | `.jodu` package / model JSON | **API-only today — do not advertise** |

Drawing-set visibility is profile-driven: client review and field construction
sheets show placed contents by default; authority-submission sheets hide them by
default.

---

## 7. Screenshots and images

**Do not link to `raw.githubusercontent.com`.** The previous site pointed every
screenshot at `raw.githubusercontent.com/Jodulabs/website/main/frontend/public/screenshots/…`
and **all of those URLs now return 404**, so the live site had broken images.
Assets must be committed to this repo and served from `/`.

Real product images now live in `client/public/product/` and are referenced as
absolute paths:

| Path | What it shows | Provenance |
|---|---|---|
| `/product/ui-plan-canvas.png` | The plan canvas with toolbar | Screenshot of the running app |
| `/product/ui-3d-preview.png` | 3D preview | Screenshot of the running app |
| `/product/ui-quantities.png` | Quantities / BoQ view | Screenshot of the running app |
| `/product/ui-schedules.png` | Schedules view | Screenshot of the running app |
| `/product/ui-sheet-composer.png` | Sheet composer | Screenshot of the running app |
| `/product/plan-sheet-30x40-g1-1.png` | Full A2 drawing sheet: ground + first floor plans, door/window/room schedules, title block | **Real product output** — rendered by the product's own PDF exporter from the canonical 30×40 G+1 model. Not a mockup. |
| `/product/ground-plan-30x40-1.png` | Clean single ground-floor plan: rooms, areas, door swings, windows, stair | **Real product output**, A3 portrait, same exporter. |

The two plan images are the *exact PDF a user exports*, rasterised. That is a
strong, honest proof point — say so.

Brand mark: `/brand/jodu-icon.svg` — a verbatim copy of the product's own
`kalakar/assets/brand/jodu-icon.svg`, the single hand-edited brand file every
app icon and favicon is generated from. Two houses sharing one stroke, crossed
as a lemniscate, on a dark teal tile. The mark always travels on its tile; it is
not a transparent glyph, and it is never redrawn for the site. It is the primary
brand signal and is used with restraint; see `icon-reference-notes.md`.

There is **no product demo video** yet. The Home page reserves a slot for one.
Do not fabricate a video embed or imply a walkthrough exists.

---

## 8. The reference project

Jodu's canonical demo is a **30×40 ft G+1 house** taken from plot to a
coordinated model that yields the plan PDF, every schedule, the quantities, and
a priced bill of quantities **in one sitting**. Every plan image in
`client/public/product/` comes from this model. Use it whenever copy needs a
concrete example — it is real and it is verified.

---

## 9. Rules for writing copy on this site

1. **No unsupported availability claims.** Platform status wording comes from
   §3 and nowhere else.
2. **No invented numbers.** No user counts, no "X% faster", no time savings, no
   pricing, no customer logos or testimonials. None of these exist yet.
3. **Never publish the name "Kalakar"**, internal module names, repo paths,
   issue numbers, or internal status words like "characterised".
4. **Prefer proof to adjectives.** Show the exported sheet, the schedules, the
   quantities. The tone is factual, technical, and quiet.
5. **Keep the honesty caveats**: 3D is not photoreal; wall tracing from an
   existing drawing is user-confirmed, not automatic; the phone captures, it
   does not author.
6. When a claim is uncertain, leave it out and flag it rather than softening it
   into something vague.
7. **Do not position Jodu against drafting tools.** No "unlike CAD", no "faster
   than CAD", no "replaces your drawing tool", no comparison tables, no
   alongside-what-you-already-use hedging. Jodu is described on its own terms:
   it holds the house as one model and every deliverable is a view of it. DXF
   and DWG appear only as file formats Jodu writes and reads — never as a
   category Jodu is measured against.
8. **Never use the word "BIM"**, or its expansion, anywhere on the site. The
   single-model idea is communicated by showing it: change the model, and the
   plan, the schedules, and the bill of quantities change with it. Say that;
   don't name it.

---

## 10. Current site copy that is inaccurate

Checked against `client/src/pages/Home.tsx` and `client/src/pages/Downloads.tsx`
on 2026-08-13:

- **All five screenshots were broken links** (404 from `raw.githubusercontent.com`).
  Fixed by committing real assets to `client/public/product/`.
- **The browser app is missing entirely.** The site presents desktop as the first
  release surface, but `app.jodulabs.com` is live today and desktop is not
  released. Downloads and the platform section both need this.
- **The product is undersold.** The site says "compose a home, review the model,
  read the quantities". It omits the priced BoQ with an editable rate book, GST,
  the material statement in bags and brass, the IS-962 drawing sets, the
  schedules set, DXF/DWG export, and the finish cascade — the substance of what
  Jodu actually produces.
- **The FAQ "Does Jodu replace existing CAD tools?" must go**, along with its
  answer. It frames Jodu as a companion to a drafting tool, which is the
  positioning we are dropping (rule 7 in §9). If a "what is this, exactly"
  question is still wanted in that slot, answer it by describing the single
  model and the deliverables that come off it.
- **"A focused surface for residential planning and downstream coordination"**
  and similar phrasing across Home and Downloads carries the same comparative
  framing and should be rewritten.
- **Android is described only as "in development"**; it is on Google Play
  internal testing with a prepared store listing.
- **"Jodu is a focused authoring tool for Indian residential plans"** is thin.
  The stronger and equally true framing is "a building modeller for the Indian
  house — one model, every deliverable, in step."

---

## 11. Keeping this file current

This file was compiled by reading the private product repo directly. It will go
stale. Re-verify before any significant copy change, and update
"Last verified" at the top.

**The product repo's own prose can lag its code.** Two examples found while
compiling this file: the canonical scope doc still says "RCC frame with brick
infill" although laterite, stone, block, fly-ash and AAC masonry are all
supported and laterite is first in the catalogue; and an earlier website-copy
ledger flagged the priced BoQ as unshipped although it has landed. When a
narrative doc and the code disagree, **the code wins** — and ask Jodu Labs
rather than repeating the older sentence. The facts here were drawn from that repo's canonical
product doc, its feature ledger, the desktop and mobile packaging workflows, the
Play Store listing metadata, and its own website-copy honesty ledger.
