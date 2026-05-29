import { forwardRef, type ReactNode } from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/cn";
import { useFieldShell } from "./FieldShell";

interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: RadioOption[];
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      orientation = "vertical",
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => {
    const fieldCtx = useFieldShell();
    // RadioGroup is itself the labelled element, so we point it at the
    // FieldShell label via aria-labelledby. (htmlFor on a <label> wrapping a
    // group is semantically wrong; labels associate with a single control.)
    const resolvedLabelledBy = ariaLabelledBy ?? (ariaLabel ? undefined : fieldCtx?.labelId);
    return (
      <RadixRadioGroup.Root
        ref={ref}
        orientation={orientation}
        aria-label={ariaLabel}
        aria-labelledby={resolvedLabelledBy}
        className={cn(
          "flex gap-[var(--space-3)]",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex cursor-pointer items-center gap-2 text-body text-text-primary",
              opt.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            <RadixRadioGroup.Item
              value={opt.value}
              disabled={opt.disabled}
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                "border border-[var(--color-border)] bg-[var(--color-surface-sunken)]",
                "transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
                "hover:border-[var(--color-border-strong)]",
                "data-[state=checked]:border-primary",
                "focus-visible:outline-none focus-visible:shadow-focus",
              )}
            >
              <RadixRadioGroup.Indicator className="flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </RadixRadioGroup.Indicator>
            </RadixRadioGroup.Item>
            {opt.label}
          </label>
        ))}
      </RadixRadioGroup.Root>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
