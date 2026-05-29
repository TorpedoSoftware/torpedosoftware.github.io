import { cn } from "@/lib/cn";

type BadgeVariant = "primary" | "danger" | "neutral";

interface BadgeProps {
  count: number;
  variant?: BadgeVariant;
  max?: number;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary text-primary-contrast",
  danger: "bg-danger text-white",
  neutral: "bg-[var(--color-border)] text-text-primary",
};

export function Badge({ count, variant = "primary", max = 99, className }: BadgeProps) {
  const display = count > max ? `${max}+` : String(count);

  return (
    <span
      className={cn(
        "inline-flex min-h-4 min-w-4 items-center justify-center rounded-full px-1 text-overline font-semibold leading-none tabular-nums",
        variantStyles[variant],
        className,
      )}
    >
      {display}
    </span>
  );
}
