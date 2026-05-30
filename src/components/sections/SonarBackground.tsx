import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

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
const FIELD_MASK = "radial-gradient(circle at center, black 0%, black 20%, transparent 80%)";

// The static grid is drawn as SVG primitives rather than CSS gradients.
// `repeating-conic-gradient` (an atan2 per pixel) and `repeating-radial-gradient`
// (a distance per pixel) are re-rasterized on every repaint, which is what
// tanked scroll FPS on mobile. Circles and lines rasterize once into a cached
// texture and are orders of magnitude cheaper even when they do repaint.
//
// Coordinate system is a 0-100 viewBox centered at (50,50). The field's CSS
// width maps onto that 100 units, so a 5-unit ring step lands at exactly 60px
// on the 1200px desktop field (preserving the prior look); `non-scaling-stroke`
// keeps every stroke a crisp 1px at any field size.

// r runs past the 50-unit edge to ~70 so rings still reach the square's corners.
const RING_RADII = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];

// 12 spokes every 30deg, expressed as 6 full diameters through the center.
const SPOKE_LINES = [0, 30, 60, 90, 120, 150].map((deg) => {
  const a = (deg * Math.PI) / 180;
  const dx = Math.sin(a) * 75;
  const dy = -Math.cos(a) * 75;
  return { x1: 50 - dx, y1: 50 - dy, x2: 50 + dx, y2: 50 + dy };
});

// Beam color stops (offset, rgba-hex), mirrored from the original CSS conic
// gradient: transparent until ~86%, ramping to a bright leading edge just before
// the seam, then transparent at the wrap so there's no visible join. The bright
// edge fades into the soft trailing tail of the rotating beam.
const BEAM_STOPS: [number, string][] = [
  [0, "#00000000"],
  [0.86, "#00000000"],
  [0.92, "#3224A514"],
  [0.97, "#3224A547"],
  [0.995, "#3224A5CC"],
  [1, "#00000000"],
];

// Bake the beam's conic gradient into a data-URL bitmap ONCE. A live CSS
// conic-gradient is re-rasterized every frame as the element rotates on mobile
// WebKit (an atan2 per pixel), which stalled the sweep to single-digit FPS. A
// raster texture, by contrast, is something the GPU caches and simply spins.
// The beam is soft, so a modest fixed resolution scales up cleanly to any field
// size. Returns null when canvas / conic gradients are unavailable (older
// browsers, jsdom tests), in which case the sweep renders nothing.
function renderBeamTexture(): string | null {
  try {
    const size = 600;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx || typeof ctx.createConicGradient !== "function") return null;
    // Start at the top to match the CSS `from 0deg`. Continuous rotation makes
    // the absolute start angle moot, but it keeps the baked image faithful.
    const gradient = ctx.createConicGradient(-Math.PI / 2, size / 2, size / 2);
    for (const [offset, color] of BEAM_STOPS) gradient.addColorStop(offset, color);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Carve the soft circular vignette into the texture's alpha (the same fade
    // FIELD_MASK applies to the static grid). `destination-in` multiplies the
    // existing pixels by this radial alpha, so the beam dissolves smoothly near
    // the rim instead of ending at the hard edge of the circular clip. Baked in
    // here, it costs nothing per frame, unlike a live CSS mask.
    ctx.globalCompositeOperation = "destination-in";
    const fade = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    fade.addColorStop(0, "#000000ff");
    fade.addColorStop(0.2, "#000000ff");
    fade.addColorStop(0.95, "#00000000");
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, size, size);

    return canvas.toDataURL();
  } catch {
    return null;
  }
}

export function SonarBackground() {
  const { theme } = useTheme();

  // Purple-on-black reads fainter than purple-on-white, so the dark theme gets
  // a stronger grid to keep the field equally legible across both backgrounds.
  const isDark = theme === "dark";
  const ringOpacity = isDark ? 0.15 : 0.06;
  const spokeOpacity = isDark ? 0.1 : 0.05;
  const crosshairOpacity = isDark ? 0.15 : 0.08;

  // Bake the rotating beam to a bitmap on mount (see renderBeamTexture). Null
  // until the effect runs and on environments without canvas support.
  const [beamTexture, setBeamTexture] = useState<string | null>(null);
  useEffect(() => {
    setBeamTexture(renderBeamTexture());
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute top-1/2 left-1/2 aspect-square w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 text-primary md:w-[min(140vh,1200px)]">
        {/* Static decoration drawn as cached SVG vector primitives (see note on
            RING_RADII above). One mask gives the soft circular vignette; it is
            paid once because nothing in here animates. */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          stroke="currentColor"
          className="absolute inset-0 size-full"
          style={{
            WebkitMaskImage: FIELD_MASK,
            maskImage: FIELD_MASK,
            // Promote to a cached GPU texture so scrolling translates the layer
            // instead of repainting the grid + mask each frame.
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          {RING_RADII.map((r) => (
            <circle
              key={r}
              cx={50}
              cy={50}
              r={r}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              opacity={ringOpacity}
            />
          ))}
          {SPOKE_LINES.map((line, index) => (
            <line
              key={index}
              {...line}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              opacity={spokeOpacity}
            />
          ))}
          {/* Crosshair: brighter horizontal + vertical lines over the spokes. */}
          <line
            x1={50}
            y1={-25}
            x2={50}
            y2={125}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            opacity={crosshairOpacity}
          />
          <line
            x1={-25}
            y1={50}
            x2={125}
            y2={50}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            opacity={crosshairOpacity}
          />
        </svg>
        {beamTexture && (
          // The rotating beam is a large, semi-transparent layer the GPU must
          // re-blend over the whole field every composite. Firefox profiling on
          // mobile showed the compositor (not the main thread) is the bottleneck:
          // the main thread sits in nsRefreshDriver::FinishedWaitingForTransaction
          // while DidComposite fires only every 30-130ms. It is composite
          // fill-rate bound, a hardware ceiling no main-thread change can move
          // (baking the texture, dropping the clip, and rendering at lower
          // resolution then scaling up all made zero difference, the last being
          // the fingerprint of a fill-rate wall). Shrinking it enough to fit
          // makes it too small to look good, so the beam is desktop-only
          // (hidden md:block). Phones keep the static grid + pings, which are
          // cheap, and desktop has the fill rate to spare.
          <div
            className={
              "animate-sonar-sweep absolute inset-0 hidden rounded-full motion-reduce:hidden md:block " +
              (theme === "dark" ? "opacity-[0.3]" : "opacity-[0.2]")
            }
            style={{ backgroundImage: `url(${beamTexture})`, backgroundSize: "100% 100%" }}
          />
        )}
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
