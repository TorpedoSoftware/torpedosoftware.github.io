import { forwardRef } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { cn } from "@/lib/cn";
import { useFieldShell } from "./FieldShell";

interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  minLabel?: string;
  maxLabel?: string;
  formatValue?: (v: number) => string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  // Per-thumb labels for multi-thumb (range) sliders. When provided, the
  // entry at index i is forwarded as `aria-label` on the corresponding
  // RadixSlider.Thumb so screen readers can distinguish lower/upper handles.
  thumbAriaLabels?: string[];
}

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  (
    {
      value,
      defaultValue = [50],
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      minLabel,
      maxLabel,
      formatValue = String,
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      thumbAriaLabels,
      ...props
    },
    ref,
  ) => {
    const current = value ?? defaultValue;
    const fieldCtx = useFieldShell();
    const resolvedLabelledBy = ariaLabelledBy ?? (ariaLabel ? undefined : fieldCtx?.labelId);

    return (
      <div className={cn("flex flex-col gap-[var(--space-2)]", className)}>
        <RadixSlider.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          onValueCommit={onValueCommit}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-labelledby={resolvedLabelledBy}
          className={cn(
            "relative flex h-5 w-full touch-none items-center select-none",
            "disabled:opacity-60",
          )}
          {...props}
        >
          <RadixSlider.Track className="relative h-1.5 w-full grow rounded-full bg-[var(--color-surface-sunken)]">
            <RadixSlider.Range className="absolute h-full rounded-full bg-primary" />
          </RadixSlider.Track>
          {current.map((_, i) => (
            <RadixSlider.Thumb
              key={i}
              aria-label={thumbAriaLabels?.[i]}
              className={cn(
                "block h-5 w-5 rounded-full border-2 border-primary bg-surface shadow-1",
                "transition-shadow duration-[var(--motion-fast)] ease-[var(--ease-out)]",
                "hover:shadow-2 focus-visible:outline-none focus-visible:shadow-focus",
              )}
            />
          ))}
        </RadixSlider.Root>
        <div className="flex items-center justify-between text-caption text-text-tertiary">
          <span>{minLabel ?? formatValue(min)}</span>
          <span className="rounded-full bg-primary-soft px-2 py-0.5 text-body-sm font-medium text-primary">
            {formatValue(current[0])}
          </span>
          <span>{maxLabel ?? formatValue(max)}</span>
        </div>
      </div>
    );
  },
);

Slider.displayName = "Slider";
