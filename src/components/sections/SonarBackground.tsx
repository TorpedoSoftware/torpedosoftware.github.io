import type { CSSProperties } from "react";
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

const sweepLineStyle: CSSProperties = {
  filter: "blur(2px)",
  background:
    "conic-gradient(from 0deg at 50% 50%, #00000000 0%, #00000000 90%, #3224A51C 95%, #3224A561 99%, #3224a5 100%)",
};

export function SonarBackground() {
  const { theme } = useTheme();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute top-1/2 left-1/2 aspect-square w-[min(140vh,1200px)] -translate-x-1/2 -translate-y-1/2 text-primary"
        style={{ WebkitMaskImage: FIELD_MASK, maskImage: FIELD_MASK }}
      >
        <div className="absolute inset-0 rounded-full opacity-[0.06]" style={ringsStyle} />
        <div className="absolute inset-0 rounded-full opacity-[0.05]" style={spokesStyle} />
        <div className="absolute inset-0 opacity-[0.08]" style={crosshairStyle} />
        <div
          className={
            "animate-sonar-sweep absolute inset-0 rounded-full motion-reduce:hidden " +
            (theme === "dark" ? "opacity-[0.3]" : "opacity-[0.2]")
          }
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
