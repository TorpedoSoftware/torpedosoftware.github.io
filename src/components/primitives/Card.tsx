import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "surface" | "raised" | "sunken" | "metric" | "interactive";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  surface: "bg-surface border border-[var(--color-border-subtle)] shadow-1 rounded-md",
  raised: "bg-surface-raised shadow-2 rounded-md",
  sunken: "bg-[var(--color-surface-sunken)] border border-[var(--color-border-subtle)] rounded-md",
  metric: "bg-surface border border-[var(--color-border-subtle)] shadow-1 rounded-md p-[var(--space-5)]",
  interactive:
    "bg-surface border border-[var(--color-border-subtle)] shadow-1 rounded-md cursor-pointer hover:shadow-2 active:translate-y-px transition-all duration-[var(--motion-fast)] ease-[var(--ease-out)]",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "surface", className, children, ...props }, ref) => (
    <div ref={ref} className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </div>
  ),
);

Card.displayName = "Card";

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-[var(--space-7)] pt-[var(--space-7)] pb-[var(--space-3)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-[var(--space-7)]", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center border-t border-[var(--color-border-subtle)] px-[var(--space-7)] py-[var(--space-4)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type MetricCardSize = "md" | "lg";

interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  sub?: ReactNode;
  sparkline?: ReactNode;
  size?: MetricCardSize;
  bare?: boolean;
}

const valueSizeClasses: Record<MetricCardSize, string> = {
  md: "text-metric-md",
  lg: "text-metric-lg",
};

export function MetricCard({
  label,
  value,
  icon,
  sub,
  sparkline,
  size = "lg",
  bare = false,
  className,
  ...props
}: MetricCardProps) {
  const content = (
    <>
      <span className="text-overline text-text-tertiary">{label}</span>
      <div className="flex items-center gap-[var(--space-2)]">
        {icon}
        <div
          className={cn(
            "min-w-0 flex-1 font-semibold leading-8 tracking-tight tabular-nums text-text-primary",
            valueSizeClasses[size],
          )}
        >
          {value}
        </div>
      </div>
      <div className="flex min-h-4 items-center justify-between">
        {sub && <span className="text-caption tabular-nums text-text-tertiary">{sub}</span>}
        {sparkline && <div className="h-6 w-16">{sparkline}</div>}
      </div>
    </>
  );

  if (bare) {
    return (
      <div className={cn("flex flex-col gap-[var(--space-1)] p-[var(--space-5)]", className)} {...props}>
        {content}
      </div>
    );
  }

  return (
    <Card variant="metric" className={cn("flex flex-col gap-[var(--space-1)]", className)} {...props}>
      {content}
    </Card>
  );
}
