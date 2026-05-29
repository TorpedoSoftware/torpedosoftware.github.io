import { type ReactNode } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/cn";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
  className?: string;
}

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <RadixTooltip.Provider delayDuration={120} skipDelayDuration={0}>
      {children}
    </RadixTooltip.Provider>
  );
}

export function Tooltip({ content, children, side = "top", delayDuration, className }: TooltipProps) {
  return (
    <RadixTooltip.Root delayDuration={delayDuration}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={8}
          className={cn(
            "z-50 max-w-[280px] rounded-md bg-surface px-3 py-2 text-body-sm leading-5 text-text-primary shadow-3",
            "border border-[var(--color-border-subtle)]",
            "data-[state=delayed-open]:motion-fade-in data-[state=delayed-open]:data-[side=top]:motion-slide-from-bottom data-[state=delayed-open]:data-[side=bottom]:motion-slide-from-top",
            className,
          )}
        >
          {content}
          <RadixTooltip.Arrow className="fill-surface" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}

interface RichTooltipProps extends TooltipProps {
  learnMoreHref?: string;
}

export function RichTooltip({
  content,
  learnMoreHref,
  children,
  side = "top",
  delayDuration,
  className,
}: RichTooltipProps) {
  return (
    <RadixTooltip.Root delayDuration={delayDuration}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={8}
          className={cn(
            "z-50 max-w-[280px] rounded-md bg-surface px-3 py-2 text-body-sm leading-5 text-text-primary shadow-3",
            "border border-[var(--color-border-subtle)]",
            "data-[state=delayed-open]:motion-fade-in",
            className,
          )}
        >
          <div className="flex flex-col gap-1.5">
            <div>{content}</div>
            {learnMoreHref && (
              <a href={learnMoreHref} className="text-primary hover:underline">
                Learn more &rarr;
              </a>
            )}
          </div>
          <RadixTooltip.Arrow className="fill-surface" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}
