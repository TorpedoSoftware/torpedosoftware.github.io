import { useEffect, useRef, useState } from "react";

/**
 * Dev-only frame-rate readout. Counts requestAnimationFrame ticks and reports
 * the rolling FPS a few times a second. The meter is intentionally cheap: it
 * accumulates frame deltas in refs and only touches React state on each refresh
 * tick, so the measurement isn't skewed by the act of measuring. Colour shifts
 * green/amber/red so a glance tells you whether the page is holding 60.
 *
 * Rendered only under `import.meta.env.DEV`; never bundled into production.
 */

// How often (ms) to push a new reading to the screen. Long enough to average
// out single-frame jitter, short enough to feel live while toggling changes.
const REFRESH_MS = 500;

function fpsColor(fps: number): string {
  if (fps >= 55) return "#22c55e";
  if (fps >= 30) return "#f59e0b";
  return "#ef4444";
}

export function FpsMeter() {
  const [fps, setFps] = useState<number | null>(null);
  const frames = useRef(0);
  const windowStart = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;

    const tick = (now: number) => {
      if (windowStart.current === null) windowStart.current = now;
      frames.current += 1;

      const elapsed = now - windowStart.current;
      if (elapsed >= REFRESH_MS) {
        setFps(Math.round((frames.current * 1000) / elapsed));
        frames.current = 0;
        windowStart.current = now;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span
      aria-hidden
      className="font-mono text-caption tabular-nums select-none"
      style={{ color: fps === null ? "var(--color-text-secondary)" : fpsColor(fps) }}
      title="Frames per second (dev only)"
    >
      {fps === null ? "--" : fps} fps
    </span>
  );
}
