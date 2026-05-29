import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagColor = "primary" | "success" | "warning" | "danger" | "info" | "neutral";

interface TagProps {
  color?: TagColor;
  children: ReactNode;
  className?: string;
}

const colorStyles: Record<TagColor, string> = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-[var(--color-surface-sunken)] text-text-secondary",
};

export function Tag({ color = "neutral", children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-caption font-medium tracking-[0.02em]",
        colorStyles[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
