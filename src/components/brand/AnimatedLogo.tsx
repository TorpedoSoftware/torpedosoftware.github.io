import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

const BASE = "/brand/logo-pieces";

/**
 * Bubble trail churned up by the prop as the torpedo exits. The exit eases in
 * (cubic-bezier matching torpedo-move), so the prop barely creeps from its
 * resting spot (~25%, 74%) until late in the 9s cycle, then rips through the
 * disc from lower-left through the centre to the top-right in a quick burst
 * (~8.0-8.65s) before it clears the ring. The spawn points trace that measured
 * sweep and each delay is the moment the prop reaches that point (~8s), so the
 * bubble pops as the prop passes and reads as its wake. Each bubble then floats
 * up (--rise) and fades over 2s: the first second finishes during the exit, the
 * second second plays over the next loop's re-entry (which starts ~1s after the
 * bubbles do). Delays/positions are tuned to the eased path and the 9s timing,
 * so they must be revisited if either changes.
 *
 * The prop is wide, so the spawn points are scattered perpendicular to the path
 * (the (1,1)/(-1,-1) diagonal, since travel is along (1,-1)) to give the wake a
 * band roughly as thick as the prop rather than a thin line. left/top mark the
 * bubble's centre; size and rise/drift are percentages of the square emblem so
 * the trail scales with it. See the bubble-rise keyframes.
 */
const BUBBLES = [
  { left: "27%", top: "66%", size: "3.4%", delay: "8s", rise: "-22%", drift: "-3%", opacity: 0.55 },
  { left: "34%", top: "73%", size: "2.4%", delay: "8s", rise: "-26%", drift: "3%", opacity: 0.42 },
  { left: "33%", top: "67%", size: "3.0%", delay: "8.1s", rise: "-24%", drift: "-2%", opacity: 0.5 },
  { left: "31%", top: "58%", size: "2.2%", delay: "8.2s", rise: "-27%", drift: "3%", opacity: 0.4 },
  { left: "39%", top: "66%", size: "3.6%", delay: "8.2s", rise: "-21%", drift: "4%", opacity: 0.5 },
  { left: "45%", top: "64%", size: "2.4%", delay: "8.3s", rise: "-25%", drift: "3%", opacity: 0.44 },
  { left: "41%", top: "54%", size: "2.8%", delay: "8.35s", rise: "-26%", drift: "-2%", opacity: 0.46 },
  { left: "42%", top: "49%", size: "2.4%", delay: "8.4s", rise: "-28%", drift: "-3%", opacity: 0.42 },
  { left: "50%", top: "57%", size: "3.0%", delay: "8.4s", rise: "-23%", drift: "3%", opacity: 0.46 },
  { left: "54%", top: "43%", size: "2.6%", delay: "8.5s", rise: "-25%", drift: "-2%", opacity: 0.44 },
  { left: "59%", top: "48%", size: "3.2%", delay: "8.5s", rise: "-22%", drift: "4%", opacity: 0.48 },
  { left: "63%", top: "30%", size: "2.4%", delay: "8.6s", rise: "-24%", drift: "-2%", opacity: 0.4 },
  { left: "68%", top: "35%", size: "2.8%", delay: "8.6s", rise: "-23%", drift: "3%", opacity: 0.42 },
];

interface AnimatedLogoProps {
  className?: string;
  label?: string;
}

/**
 * Circular Torpedo Software emblem rebuilt from the individual layer PNGs in
 * public/brand/logo-pieces. The body and propeller form a single moving unit
 * that loops in from the bottom-left, settles into place, and exits out the
 * top-right, while the propeller spins continuously behind the body. The body
 * and prop ride identical full-size wrappers so they move rigidly together,
 * but each crosses the ring on its own schedule (driven by separate keyframes):
 * the body (nose) passes in front partway through the entrance, the prop (tail)
 * stays behind until the exit begins, so the torpedo threads through the ring
 * nose-first. Keeping them in sibling wrappers (rather than one) is what lets
 * their z-index compare against the ring independently. The container clips to
 * a circle so the torpedo is hidden once it leaves the ring.
 *
 * Layer geometry comes from the source Figma (16-unit frame): ring 16x16 @ 0,0,
 * purple disc 14x14 @ 1,1, torpedo bbox 11.44x11.24 @ 2.14,2.42. The motion is
 * adapted from the Roblox loading-screen component, which uses these same PNGs.
 */
export function AnimatedLogo({ className, label = "Torpedo Software" }: AnimatedLogoProps) {
  return (
    <div
      className={cn(
        "relative isolate aspect-square overflow-hidden rounded-full [clip-path:circle(49.5%)]",
        className,
      )}
    >
      {/* background disc. Figma sizes it 14x14 (87.5%), but purple.png has a
          ~0.1% transparent margin, so at 87.5% the disc edge renders at 43.66%,
          just short of the ring's 43.75% inner edge, leaving a 1px seam. Sized to
          87.7% so the disc edge lands exactly on the ring's inner edge (49.9% art
          radius x 0.877 = 43.75%): the seam closes while the disc's lighter edge
          stroke (art radius 48.1-49.9%) stays fully visible inside the ring. */}
      <img
        src={`${BASE}/purple.png`}
        alt=""
        aria-hidden
        className="absolute top-1/2 left-1/2 z-0 h-[87.85%] w-[87.85%] -translate-x-1/2 -translate-y-1/2"
      />
      {/* Bubble trail churned up by the prop on exit. Each bubble is a static
          dot centred on its spawn point, carried by a full-size (inset-0)
          wrapper that runs the float-and-fade travel: a translate on the
          wrapper is a percentage of the emblem (not the tiny dot), so the rise
          is actually visible. The layer sits at z-[2]: above the disc, below the
          ring (z-[3]) and below the prop once it crosses to the front (z-[5]) on
          exit, so the bubbles read as trailing behind the prop. Clipped to the
          circle by the container, decorative. */}
      {BUBBLES.map((bubble) => (
        <span
          key={`${bubble.left}-${bubble.top}`}
          aria-hidden
          className="animate-bubble-rise absolute inset-0 z-[2] motion-reduce:hidden"
          style={
            {
              animationDelay: bubble.delay,
              "--rise": bubble.rise,
              "--drift": bubble.drift,
              "--bubble-opacity": bubble.opacity,
            } as CSSProperties
          }
        >
          <span
            className="bubble absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: bubble.left, top: bubble.top, width: bubble.size, height: bubble.size }}
          />
        </span>
      ))}
      {/* prop (tail). Two nested wrappers split two jobs that can't share an
          element. The outer (static) wrapper clips to a circle just inside the
          ring's outer edge (49.5% vs the ring's 49.9%) so the tail never peeks
          outside the ring on exit, and carries the z-crossing: clip-path
          establishes a stacking context, so its animated z-index competes
          directly with the ring (an animated z-index *inside* it would be
          trapped below the ring). The inner wrapper carries only the travel
          transform, which must NOT sit on the clipping element or the clip would
          move with it. Base z-[1] keeps the tail behind the ring at rest (also
          the reduced-motion resting state); the keyframes cross it in front once
          the exit begins. aspect-[512/640] matches the PNG so it keeps its
          natural shape rather than stretching. The Figma torpedo bbox measures
          the visible art, but prop.png has transparent padding (art spans x
          0-99.8%, y 11.56-89.69% of the file), so the file is sized/placed to
          land the visible tail's bottom-left on the bbox bottom-left (13.375%,
          85.375%). */}
      <div className="absolute inset-0 z-[1] isolate animate-torpedo-prop-z motion-reduce:animate-none">
        <div className="absolute inset-0 animate-torpedo-move motion-reduce:animate-none">
          <img
            src={`${BASE}/prop.png`}
            alt=""
            aria-hidden
            className="absolute bottom-[11.55%] left-[13.375%] aspect-[512/640] w-[23.92%] animate-torpedo-spin motion-reduce:animate-none"
          />
        </div>
      </div>
      {/* body (nose). Same two-wrapper split as the prop. Base z-[5] keeps the
          nose in front of the ring at rest (also the reduced-motion resting
          state); the keyframes cross it in front during entry. aspect-square
          matches the PNG. body.png also has transparent padding (art spans x
          2.34-95.31%, y 0-92.97% of the file), so the file is sized/placed to
          land the visible nose's top-right on the bbox top-right (84.875%,
          15.125%). Together with the prop's bottom-left, the visible art's
          combined bbox equals the Figma rect exactly. */}
      <div className="absolute inset-0 z-[5] isolate animate-torpedo-body-z motion-reduce:animate-none">
        <div className="absolute inset-0 animate-torpedo-move motion-reduce:animate-none">
          <img
            src={`${BASE}/body.png`}
            alt=""
            aria-hidden
            className="absolute top-[15.125%] left-[31.57%] aspect-square w-[55.93%]"
          />
        </div>
      </div>
      {/* ring overlay. Figma places it at 16x16 within the 16-unit frame, so it
          fills the container exactly. */}
      <img src={`${BASE}/ring.png`} alt={label} className="absolute inset-0 z-[3] h-full w-full" />
    </div>
  );
}
