import { forwardRef, type ReactNode } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "@/lib/cn";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(({ className, ...props }, ref) => (
  <RadixSwitch.Root
    ref={ref}
    className={cn(
      "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
      "bg-[var(--color-border)] transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
      "data-[state=checked]:bg-primary",
      "focus-visible:outline-none focus-visible:shadow-focus",
      "disabled:cursor-not-allowed disabled:opacity-60",
      className,
    )}
    {...props}
  >
    <RadixSwitch.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-1",
        "transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)]",
        "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      )}
    />
  </RadixSwitch.Root>
));

Switch.displayName = "Switch";

interface LabeledSwitchProps extends SwitchProps {
  label: ReactNode;
}

// The Switch + sibling text label is the canonical row pattern across editors.
// Single primitive enforces text-body-sm/secondary so the label style never
// drifts across editors.
export const LabeledSwitch = forwardRef<HTMLButtonElement, LabeledSwitchProps>(
  ({ label, className, ...props }, ref) => (
    <label className="flex cursor-pointer items-center gap-[var(--space-3)]">
      <Switch ref={ref} className={className} {...props} />
      <span className="text-body-sm text-text-secondary">{label}</span>
    </label>
  ),
);

LabeledSwitch.displayName = "LabeledSwitch";
