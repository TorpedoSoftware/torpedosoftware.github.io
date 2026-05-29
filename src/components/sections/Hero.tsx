import { Mail } from "lucide-react";
import type { SiteContent } from "@/content/schemas";
import { Button } from "@/components/primitives/Button";
import { AnimatedWordmark } from "@/components/brand/AnimatedWordmark";
import { SonarBackground } from "@/components/sections/SonarBackground";

interface HeroProps {
  site: SiteContent;
}

function renderTagline(tagline: string, highlights: string[]) {
  const highlightsSet = new Set(highlights);
  return tagline.split(/(\s+)/).map((segment, index) => {
    const normalized = segment.toLowerCase().replace(/[^a-z]/g, "");
    if (highlightsSet.has(normalized)) {
      return (
        <span key={index} className="text-primary">
          {segment}
        </span>
      );
    }
    return segment;
  });
}

export function Hero({ site }: HeroProps) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[radial-gradient(ellipse_at_70%_50%,var(--color-primary-soft)_0%,var(--color-canvas)_70%)]">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-[var(--space-8)] px-[var(--space-7)] pt-[var(--space-9)] pb-[var(--space-11)] lg:px-[var(--space-9)] lg:py-[var(--space-13)]">
        <h1 className="relative z-[-1] w-full max-w-[820px]">
          <SonarBackground />
          <AnimatedWordmark label={site.name} className="relative w-full" />
        </h1>
        <p className="text-heading-lg text-center font-display uppercase tracking-wide text-text-secondary">
          {renderTagline(site.tagline, site.taglineHighlights ?? [])}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-[var(--space-3)]">
          <Button variant="primary" asChild>
            <a href="#projects">Our work</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="#team">Meet the team</a>
          </Button>
          <Button variant="tertiary" asChild>
            <a href="#contact">
              <Mail size={18} strokeWidth={1.75} className="mr-1" />
              Contact us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
