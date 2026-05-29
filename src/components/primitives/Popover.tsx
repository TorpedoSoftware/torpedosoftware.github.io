import { type ReactNode } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function Popover({ trigger, children, side = "bottom", className }: PopoverProps) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          sideOffset={8}
          align="start"
          className={cn(
            "z-50 w-72 rounded-md border border-[var(--color-border-subtle)] bg-surface p-4 shadow-3",
            "data-[state=open]:motion-zoom-in data-[state=open]:data-[side=bottom]:motion-slide-from-top data-[state=open]:data-[side=top]:motion-slide-from-bottom",
            "focus:outline-none",
            className,
          )}
        >
          {children}
          <RadixPopover.Close
            className={cn(
              "absolute right-2 top-2 rounded-sm p-1",
              "text-text-tertiary hover:text-text-primary hover:bg-[var(--color-surface-sunken)]",
              "focus-visible:outline-none focus-visible:shadow-focus",
            )}
            aria-label="Close"
          >
            <X size={14} strokeWidth={1.75} />
          </RadixPopover.Close>
          <RadixPopover.Arrow className="fill-surface" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
