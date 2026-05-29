import { cn } from "@/lib/cn";

interface LinearProgressProps {
  value?: number;
  max?: number;
  className?: string;
  label?: string;
}

export function LinearProgress({ value, max = 100, className, label }: LinearProgressProps) {
  const indeterminate = value == null;
  const pct = indeterminate ? 0 : Math.min(100, (value / max) * 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemax={max}
      aria-label={label ?? "Progress"}
      className={cn("h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-sunken)]", className)}
    >
      <div
        className={cn(
          "h-full rounded-full bg-primary transition-[width] duration-[var(--motion-standard)] ease-[var(--ease-out)]",
          indeterminate && "animate-indeterminate-progress w-1/3",
        )}
        style={indeterminate ? undefined : { width: `${pct}%` }}
      />
    </div>
  );
}
