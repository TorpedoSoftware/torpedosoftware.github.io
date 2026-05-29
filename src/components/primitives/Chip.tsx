import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  icon?: ReactNode;
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ selected, icon, children, className, ...props }, ref) => (
    <button
      ref={ref}
      aria-pressed={selected}
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-caption font-medium tracking-[0.02em]",
        "transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
        "focus-visible:outline-none focus-visible:shadow-focus",
        "select-none cursor-pointer",
        selected
          ? "border-primary bg-primary text-primary-contrast"
          : "border-[var(--color-border)] bg-surface text-text-primary hover:bg-primary-soft",
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  ),
);

Chip.displayName = "Chip";
