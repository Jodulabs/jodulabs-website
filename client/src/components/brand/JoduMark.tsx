/**
 * The Jodu mark.
 *
 * The same artwork the product ships: `public/brand/jodu-icon.svg` is a verbatim
 * copy of `kalakar/assets/brand/jodu-icon.svg`, the one hand-edited brand file
 * every app icon and favicon is generated from. Copy that file over when it
 * changes; never redraw the mark here, or the site and the app drift apart.
 *
 * The mark carries its own tile, so it needs no background from the caller.
 */
export default function JoduMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <img
      src="/brand/jodu-icon.svg"
      alt=""
      aria-hidden={true}
      className={className}
      width={28}
      height={28}
      draggable={false}
    />
  );
}
