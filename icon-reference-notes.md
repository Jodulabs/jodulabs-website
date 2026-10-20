# Icon reference notes

The mark is **not owned by this repository**. The single hand-edited brand file
is `kalakar/assets/brand/jodu-icon.svg` — two houses sharing one stroke, crossed
as a lemniscate, in `#74c1a9` on a `#041e25` tile with a 22% corner radius. Every
desktop, mobile, web and favicon asset across the product is generated from it by
`kalakar/scripts/generate_brand_assets.sh`.

This site carries copies of that file, so the symbol on jodulabs.com and the
symbol in the app can never drift apart:

| Path | Purpose |
| --- | --- |
| `client/public/brand/jodu-icon.svg` | In-page mark, rendered by `client/src/components/brand/JoduMark.tsx` |
| `client/public/favicon.svg` | Browser tab |
| `client/public/apple-touch-icon.png` | 180×180 raster for Safari/iOS |

To update the mark: edit the file in kalakar, run its generator, then copy the
SVG into both paths above and re-render the 180×180 PNG from it. Never edit these
copies directly, and never redraw the mark in CSS or JSX.

Superseded: the site previously shipped a temporary two-diamond CSS monogram in
the header/footer and a differently-drawn `jodulabs-infinite-mark.png` favicon.
Both were site-local inventions and have been removed.
