import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";

interface TopBarProps {
  title?: string;
  actions?: ReactNode;
  className?: string;
}

export function TopBar({ title = "boatbomber", actions, className }: TopBarProps) {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between gap-[var(--space-3)] border-b border-[var(--color-border-subtle)] bg-surface px-[var(--space-4)] md:px-[var(--space-7)]",
        className,
      )}
    >
      <Link
        to="/"
        aria-label="Go to home"
        className="flex min-w-0 items-center gap-[var(--space-1)] rounded-sm focus-visible:outline-none focus-visible:shadow-focus"
      >
        <span
          className="truncate text-heading-sm font-semibold tracking-tight text-text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </span>
      </Link>
      <div className="flex items-center gap-[var(--space-2)]">
        {actions}
        <ThemeToggle />
      </div>
    </header>
  );
}
