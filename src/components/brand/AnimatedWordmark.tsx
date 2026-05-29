import { cn } from "@/lib/cn";
import { AnimatedLogo } from "./AnimatedLogo";

interface AnimatedWordmarkProps {
  className?: string;
  label?: string;
}

/**
 * Full Torpedo Software wordmark: the animated emblem flanked by the "TORPEDO"
 * and "SOFTWARE" lettering, laid out to match the source wordmark
 * (TORPEDO | emblem | SOFTWARE). The lettering PNGs are flat silhouettes used
 * as CSS masks (see the mask-torpedo / mask-software utilities) rather than
 * drawn directly, so each word is painted with a theme-reactive color: TORPEDO
 * in the brand purple (--color-primary) and SOFTWARE in the body-text color
 * (--color-text-primary). Both pick up the dark theme's lightened values, so
 * the lettering stays legible on either canvas where the baked purple/white
 * would not. The emblem carries the accessible name; the lettering is purely
 * decorative.
 *
 * Proportions follow the source wordmark's 80x16 frame: each word sits in a box
 * 1.71x the emblem's width and roughly half its height, with a small gap either
 * side of the emblem. These are expressed as percentages of the row so the
 * whole mark scales by width alone. Both PNGs carry symmetric vertical padding,
 * so items-center lands each word's lettering on the emblem's centerline.
 */
export function AnimatedWordmark({ className, label = "Torpedo Software" }: AnimatedWordmarkProps) {
  return (
    <div className={cn("flex items-center justify-center gap-[3.2%]", className)}>
      <div aria-hidden className="mask-torpedo aspect-[1024/366] w-[36.2%] bg-[var(--color-primary)]" />
      <AnimatedLogo label={label} className="w-[21.2%]" />
      <div aria-hidden className="mask-software aspect-[1024/366] w-[36.2%] bg-[var(--color-text-primary)]" />
    </div>
  );
}
