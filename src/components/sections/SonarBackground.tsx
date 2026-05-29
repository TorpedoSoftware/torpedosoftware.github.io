import type { CSSProperties } from "react";

/**
 * Decorative naval-sonar field for the Hero background: concentric range rings,
 * a radial spoke grid, a center crosshair, a slowly rotating sweep beam with a
 * trailing fade, and gentle pings that bloom as the beam passes.
 *
 * Rendered faintly in brand purple. The field sets `color: var(--color-primary)`
 * once and every layer paints with `currentColor`, so the whole sonar is
 * theme-reactive; faintness comes from low per-layer opacity, not baked-in alpha.
 * Purely decorative (aria-hidden, pointer-events-none). The rotating sweep and
 * pings hide under reduced motion, leaving the static grid as quiet decoration.
 */

interface Ping {
  /** Horizontal position within the square field, as a percentage. */
  left: number;
  /** Vertical position within the square field, as a percentage. */
  top: number;
  /** Dot diameter in pixels. */
  size: number;
  /**
   * Seconds offset so the bloom lands as the 8s beam sweeps past this dot's
   * angle: delay = (angleFromTopClockwise / 360) * 8.
   */
  delay: number;
  /**
   * Full cycle in seconds. 8s fires every sweep; multiples (16s, 24s) fire only
   * every other / third pass, so the contacts read as intermittent.
   */
  duration: number;
}

// Positions derive from an angle (clockwise from top) and a radius fraction:
//   left = 50 + r*50*sin(theta),  top = 50 - r*50*cos(theta)
// and delay = (theta / 360) * 8. Angles/radii are spread irregularly on purpose.
const PINGS: Ping[] = [
  { left: 67.8, top: 24.6, size: 8, delay: 0.78, duration: 16 },
  { left: 69.7, top: 46.5, size: 6, delay: 1.78, duration: 8 },
  { left: 76.8, top: 72.5, size: 9, delay: 2.89, duration: 24 },
  { left: 43.7, top: 63.6, size: 6, delay: 4.56, duration: 8 },
  { left: 23.4, top: 57.1, size: 8, delay: 5.67, duration: 16 },
  { left: 31.6, top: 34.6, size: 7, delay: 6.89, duration: 24 },
];

// Soft circular vignette so the field bleeds into the canvas with no hard edge.
const FIELD_MASK = "radial-gradient(circle at center, black 0%, black 52%, transparent 80%)";

const ringsStyle: CSSProperties = {
  backgroundImage:
    "repeating-radial-gradient(circle at center, transparent 0, transparent 59px, currentColor 59px, currentColor 60px)",
};

const spokesStyle: CSSProperties = {
  backgroundImage:
    "repeating-conic-gradient(from 0deg at center, currentColor 0deg 0.25deg, transparent 0.25deg 30deg)",
};

const crosshairStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to bottom, transparent calc(50% - 0.5px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 0.5px)), linear-gradient(to right, transparent calc(50% - 0.5px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 0.5px))",
};

// The sweep is two synced layers so the leading edge can read while the trail
// stays smooth. The leading line is a thin conic spike at the seam, kept faint
// and lightly blurred with soft edges so it reads as a gentle leading edge
// rather than a hard laser (which was distracting, esp. in light).
// The trail runs the full length behind the line, toward the rim, but its radial
// alpha starts easing down early and over a long span so the glow dissolves
// gradually as it approaches the rim rather than terminating in a hard tip. It is
// kept narrow ANGULARLY (see the conic below) so the glow hugs the line instead
// of fanning far out behind it.
const sweepTrailMask = "radial-gradient(circle at center, black 0%, black 20%, transparent 72%)";

// The trailing comet fade. A low-contrast gradient over this large an area only
// resolves to ~40 distinct 8-bit levels, so it bands into visible wedges no
// matter how it is shaped or blurred. The blur softens band edges; the dither
// layer below removes them. Defined once so the dither can reuse it as a mask.
const sweepTrailConic =
  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 318deg, color-mix(in srgb, currentColor 2%, transparent) 332deg, color-mix(in srgb, currentColor 7%, transparent) 343deg, color-mix(in srgb, currentColor 18%, transparent) 350deg, color-mix(in srgb, currentColor 45%, transparent) 355deg, currentColor 359deg, transparent 360deg)";

// The blur spreads the trail's bright leading edge slightly FORWARD past the
// line, which looks wrong (glow should only sit behind the line). Mask is
// applied after the filter, so this conic clips the trail to the half-circle
// behind the line: opaque from just behind the seam round to the far side,
// transparent ahead of it. The soft transition sits at the bottom (opposite the
// line) where there is no trail, so it never shows.
const sweepBehindLineMask =
  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 160deg, black 200deg, black 360deg)";

const sweepTrailStyle: CSSProperties = {
  background: sweepTrailConic,
  WebkitMaskImage: `${sweepTrailMask}, ${sweepBehindLineMask}`,
  maskImage: `${sweepTrailMask}, ${sweepBehindLineMask}`,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
  filter: "blur(32px)",
};

// Dither confined to the trail, in the trail's own purple. A flat layer of
// currentColor whose alpha IS high-frequency noise: speckled purple, not white
// luminance grain. Laid over the banded trail it fills the gaps between the
// 8-bit steps with purple speckle so the eye reads a smooth fade. The noise SVG
// outputs white RGB with alpha = noise luminance, so it drives the purple
// layer's alpha when used as a mask. Rasterized once and tiled = free per frame.
// The feComponentTransfer steepens the alpha so the speckle reads as distinct
// grain (more flair) rather than a faint haze.
const ditherNoiseMask =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.34 0.33 0.33 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='1.9' intercept='-0.45'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Outer layer: rotates with the sweep and carries the trail-shaped mask, so the
// dither window tracks the comet. Inner layer (below): counter-rotates by the
// same amount so the purple grain texture stays fixed in place rather than
// dragging around in a circle, while still being clipped to the rotating window.
const sweepDitherClipStyle: CSSProperties = {
  WebkitMaskImage: `${sweepTrailConic}, ${sweepTrailMask}`,
  maskImage: `${sweepTrailConic}, ${sweepTrailMask}`,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

const sweepDitherGrainStyle: CSSProperties = {
  background: "currentColor",
  WebkitMaskImage: ditherNoiseMask,
  maskImage: ditherNoiseMask,
  animationDirection: "reverse",
};

// The leading line reaches toward the rim, but its radial alpha eases down early
// and over a long span so the bright spoke tapers off smoothly instead of ending
// in a hard, visible tip (which read as a harsh cutoff, esp. in light).
const sweepLineMask = "radial-gradient(circle at center, black 0%, black 18%, transparent 68%)";

const sweepLineStyle: CSSProperties = {
  background:
    "conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 357.8deg, color-mix(in srgb, currentColor 50%, transparent) 359deg, currentColor 359.6deg, transparent 360deg)",
  WebkitMaskImage: sweepLineMask,
  maskImage: sweepLineMask,
  filter: "blur(1.5px)",
};

export function SonarBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute top-[45%] left-1/2 aspect-square w-[min(140vh,1200px)] -translate-x-1/2 -translate-y-1/2 text-primary"
        style={{ WebkitMaskImage: FIELD_MASK, maskImage: FIELD_MASK }}
      >
        <div className="absolute inset-0 rounded-full opacity-[0.06]" style={ringsStyle} />
        <div className="absolute inset-0 rounded-full opacity-[0.05]" style={spokesStyle} />
        <div className="absolute inset-0 opacity-[0.08]" style={crosshairStyle} />
        <div
          className="animate-sonar-sweep absolute inset-0 rounded-full opacity-[0.1] motion-reduce:hidden"
          style={sweepTrailStyle}
        />
        <div
          className="animate-sonar-sweep absolute inset-0 rounded-full motion-reduce:hidden"
          style={sweepDitherClipStyle}
        >
          <div
            className="animate-sonar-sweep absolute inset-[-30%] opacity-60"
            style={sweepDitherGrainStyle}
          />
        </div>
        <div
          className="animate-sonar-sweep absolute inset-0 rounded-full opacity-[0.085] motion-reduce:hidden"
          style={sweepLineStyle}
        />
        {PINGS.map((ping, index) => (
          // Wrapper handles positioning + centering; the inner span owns the
          // animated transform (scale) so the two never fight over `transform`.
          <span
            key={index}
            className="absolute"
            style={{
              left: `${ping.left}%`,
              top: `${ping.top}%`,
              width: ping.size,
              height: ping.size,
              marginLeft: -ping.size / 2,
              marginTop: -ping.size / 2,
            }}
          >
            <span
              className="animate-sonar-ping block size-full rounded-full opacity-40 motion-reduce:hidden"
              style={{
                background: "radial-gradient(circle, currentColor 0%, currentColor 35%, transparent 70%)",
                animationDelay: `${ping.delay}s`,
                animationDuration: `${ping.duration}s`,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
