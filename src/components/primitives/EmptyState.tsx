import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-[var(--space-4)] py-[var(--space-11)] text-center",
        className,
      )}
    >
      <div className="text-text-tertiary">{icon}</div>
      <h3 className="text-heading-sm font-semibold text-text-primary">{title}</h3>
      {description && <p className="max-w-[280px] text-body text-text-secondary">{description}</p>}
      {action && <div className="mt-[var(--space-2)]">{action}</div>}
    </div>
  );
}
