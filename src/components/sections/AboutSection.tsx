import type { AboutContent } from "@/content/schemas";
import { Section } from "./Section";

interface AboutSectionProps {
  about: AboutContent;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <Section id="about" title="About us">
      <div className="flex flex-col gap-[var(--space-5)]">
        <p className="max-w-3xl text-body-lg leading-7 text-text-primary">{about.intro}</p>
        {about.paragraphs.map((p, i) => (
          <p key={i} className="max-w-3xl text-body-lg leading-7 text-text-secondary">
            {p}
          </p>
        ))}
      </div>
      {about.pillars && about.pillars.length > 0 && (
        <div className="grid gap-[var(--space-5)] md:grid-cols-3">
          {about.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col gap-[var(--space-3)] rounded-lg border border-[var(--color-border-subtle)] bg-surface p-[var(--space-6)]"
            >
              <h3 className="text-heading-sm text-primary">{pillar.title}</h3>
              <p className="text-body text-text-secondary">{pillar.description}</p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
