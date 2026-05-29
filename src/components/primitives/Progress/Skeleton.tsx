import { cn } from "@/lib/cn";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: string;
  className?: string;
}

export function Skeleton({
  width = "100%",
  height = 20,
  radius = "var(--radius-sm)",
  className,
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-shimmer bg-[var(--color-skeleton-base)]",
        "bg-[length:200%_100%]",
        "bg-gradient-to-r from-[var(--color-skeleton-base)] via-[var(--color-skeleton-shimmer)] to-[var(--color-skeleton-base)]",
        className,
      )}
      style={{
        width,
        height,
        borderRadius: radius,
      }}
    />
  );
}
