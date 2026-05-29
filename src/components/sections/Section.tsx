import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/useInView";

interface SectionProps {
  id?: string;
  title?: string;
  intro?: ReactNode;
  className?: string;
  bg?: "default" | "alt";
  align?: "left" | "center";
  decoration?: ReactNode;
  children: ReactNode;
}

export function Section({
  id,
  title,
  intro,
  className,
  bg = "default",
  align = "left",
  decoration,
  children,
}: SectionProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "scroll-mt-16 py-[var(--space-9)] md:py-[var(--space-10)]",
        bg === "alt" && "bg-surface-sunken",
        decoration && "relative",
        className,
      )}
    >
      {decoration}
      <div
        className={cn(
          "mx-auto flex max-w-5xl flex-col gap-[var(--space-9)] px-[var(--space-7)] md:px-[var(--space-9)]",
          "transition-[opacity,transform] duration-600 ease-out",
          inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          decoration && "relative z-10",
        )}
      >
        {(title || intro) && (
          <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
            {title && <h2 className="text-display-md text-text-primary">{title}</h2>}
            {intro && (
              <div className="mt-[var(--space-4)] text-body-lg leading-7 text-text-secondary">{intro}</div>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
