import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TopBar } from "./TopBar";

interface PageShellProps {
  sidebar?: ReactNode;
  mobileNav?: ReactNode;
  topBarActions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function PageShell({ sidebar, mobileNav, topBarActions, children, className }: PageShellProps) {
  return (
    <div className="flex h-full flex-col bg-canvas">
      <TopBar actions={topBarActions} />
      <div className={cn("flex flex-1 overflow-hidden", className)}>
        {sidebar && <div className="hidden md:flex">{sidebar}</div>}
        <main className="flex-1 overflow-y-auto px-[var(--space-5)] py-[var(--space-6)] md:px-[var(--space-10)] md:py-[var(--space-8)]">
          {children}
        </main>
      </div>
      {mobileNav && <div className="md:hidden">{mobileNav}</div>}
    </div>
  );
}
