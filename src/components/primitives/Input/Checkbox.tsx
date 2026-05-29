import { forwardRef } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface CheckboxProps {
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(({ className, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={cn(
      "flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border border-[var(--color-border)]",
      "bg-[var(--color-surface-sunken)]",
      "transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
      "hover:border-[var(--color-border-strong)]",
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white",
      "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-white",
      "focus-visible:outline-none focus-visible:shadow-focus",
      "disabled:cursor-not-allowed disabled:opacity-60",
      className,
    )}
    {...props}
  >
    <RadixCheckbox.Indicator className="flex items-center justify-center">
      <Check size={14} strokeWidth={2.5} />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
));

Checkbox.displayName = "Checkbox";
