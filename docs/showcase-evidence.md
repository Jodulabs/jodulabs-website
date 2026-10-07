# Product website showcase evidence

Captured 2026-10-07 from the real Jodu platform. Website branch: `product-showcase`.
Product branch: `website-showcase` (base `origin/main` at `96c5777b`, product fixes committed locally at `c02f1bef`; further supporting fixes uncommitted).

## Project and outputs

The Gable House is an authored showcase, not a built client project. The actual project was renamed through the project API; its local slug remains `laterite-house-2`. It has a 40 × 60 ft plot, ground and first floors.

Geometry/finishes are from revision 267. Revision 268 adds representative rate-book entries; geometry did not change. Portable backups for both revisions remain in the product worktree's ignored `.local/artifacts/website-showcase/` directory.

| Website asset | Source |
| --- | --- |
| `hero.png`, `laterite-house.glb` | Actual interactive GLB export at revision 267. Poster captured from the website's GLB viewer. Camera, lighting and a ground plane are presentation choices; house geometry is unchanged. |
| `plan.png`, `exterior.png`, `schedules.png` | Actual product workspace, renamed project at revision 268. |
| `interior.png` | Actual Explore view in the living room, renamed project at revision 268. |
| `estimate.png` | Actual BOQ workspace at revision 268, after representative rates were entered. |
| `drawing.png` | Existing authentic PDF raster from the separate canonical 30 × 40 ft G+1 house. Clearly labelled separately on the site. |
| `wall-draw.mp4`, `wall-draw.webm`, `wall-draw.png` | Existing published product help guide (`docs/user/help/public/clips/wall-draw.*`), a separate manual-authoring demonstration. WebM is a codec conversion of the same clip for Chromium playback. |

All 34 displayed work items are priced using 34 illustrative rate-book lines, with sources labelled “Illustrative showcase rate, not a contractor quotation”. The API returned zero missing-rate rows, ₹38,68,527.46 base, ₹6,96,334.94 GST and ₹45,64,862 rounded total. Quantities remain derived from the model. These prices do not claim to be verified market quotations.

## AI scenarios

- **Exterior Ideas:** entered the brief in the actual Exterior → Spatial → Ideas workspace and generated three ideas through Pi. All three completed. `exterior-brief.png` is the input screen; `exterior-idea-economy.png`, `exterior-idea-standard.png`, and `exterior-idea-premium.png` are images returned by the platform. Names: Ivory Jaali Calm, Timber-Grid Warmth, Sandstone Teak Finesse. They are inspiration, not model geometry, measured output or built-house photos.
- **Ask Jodu:** configured its local environment route to `pi-luna` through the normal routing API. Asked “How many rooms are on each storey?” Actual answer: Ground 10, First 11, with one project source. `ask-panel.png` captures that actual response.
- **Finish from a brief:** `finish-brief.png` captures the actual entry workspace with a natural-language brief, paired with an explicitly labelled authored interior as a finish reference. The current implementation exclusively requires evaluation-capable TypeSafe/Jev, whose gateway credential is absent. No successful finish-brief output is claimed. The manually authored interior is not presented as its AI result. The user deferred any Pi evaluator or combined Jev/LLM design; the existing evaluation workflow remains intact.

The user explicitly approved scenario-specific examples: feature evidence need not use a single coherent project or be a complete end-to-end house story.

## Remotion website demos

The user requested Remotion for the demos. Reused the product's existing `tools/howto-video` managed-browser recorder and Remotion composition, with three source scenarios:

- `website-exterior-ideas`: brief entry, then enlargement of the previously generated Standard idea. The original generation is documented above; this capture does not stage a new generation or imply measured geometry.
- `website-finish-direction`: brief entry, then the actual authored living-room reference. No Jev run is implied.
- `website-ask-jodu`: the actual quick-start question sends directly, Pi answers, then the project source is expanded.

Each recording passed two outcome checks: the quantity projection still reports source revision 268 and the authored plan still contains walls. Uneventful preparation/waiting is cut and playback is 1.2×. Titles and captions are editorial overlays; the platform footage is authentic. Rendered stills were inspected. The website uses on-demand video disclosures with MP4 and WebM sources, without autoplay.

## Supporting product fixes and limits

- Purchasing statement now includes authored plaster-layer volume in cement/sand mortar purchases. Minimal plaster/exposed-wall guard passes.
- Structural measurement rows and construction-work BOQ rows use authored storey names. Facade-wide finishes are labelled “Facade zones” and do not masquerade as a storey ID.
- AI routing publication validates all task/capability contracts but checks credentials for changed primaries. An unchanged unavailable provider no longer blocks configuring another task. Rollback retains its complete availability check.
- The Gable House's strict PDF exports are still blocked by unsupported roof/structure relationships. The website uses the separately labelled existing reference drawing instead of bypassing that gate.
- Tiny eave slivers and gable ticks remain product design/render follow-ups. No empty-opening-geometry diagnostic appeared in the recovered revision's render response.
- Mobile-app preview is excluded. Website phone layout remains in scope.

No push, deployment or publication has been performed.
