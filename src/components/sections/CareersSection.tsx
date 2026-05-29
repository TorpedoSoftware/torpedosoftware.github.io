import { Mail } from "lucide-react";
import type { CareersContent, Opening, SiteContent } from "@/content/schemas";
import { Section } from "./Section";
import { Button } from "@/components/primitives/Button";

interface CareersSectionProps {
  careers: CareersContent;
  site: SiteContent;
}

function MetaRow({ opening }: { opening: Opening }) {
  const parts = [opening.type, opening.location, opening.duration].filter(Boolean);
  if (parts.length === 0) return null;
  return (
    <p className="text-body-sm text-text-tertiary">
      {parts.map((part, i) => (
        <span key={part}>
          {i > 0 && <span className="mx-2 opacity-50">·</span>}
          {part}
        </span>
      ))}
    </p>
  );
}

function DetailList({ label, items }: { label: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      <p className="text-overline text-text-tertiary">{label}</p>
      <ul className="flex flex-col gap-[var(--space-1)]">
        {items.map((item) => (
          <li key={item} className="text-body-sm text-text-secondary">
            <span className="mr-2 text-primary">›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OpeningCard({ opening }: { opening: Opening }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-[var(--color-border-subtle)] bg-surface">
      {opening.image && (
        <img src={opening.image} alt={opening.title} className="aspect-video w-full object-cover" />
      )}
      <div className="flex flex-col gap-[var(--space-4)] p-[var(--space-6)]">
        <div className="flex flex-col gap-[var(--space-1)]">
          <h3 className="text-heading-md text-text-primary">{opening.title}</h3>
          <MetaRow opening={opening} />
        </div>
        <p className="text-body text-text-secondary">{opening.description}</p>
        <div className="grid gap-[var(--space-5)] sm:grid-cols-2">
          <DetailList label="Requirements" items={opening.requirements} />
          <DetailList label="Responsibilities" items={opening.responsibilities} />
        </div>
        {opening.applyUrl && (
          <div>
            <Button variant="primary" size="sm" asChild>
              <a href={opening.applyUrl} target="_blank" rel="noopener noreferrer">
                Apply
              </a>
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

export function CareersSection({ careers, site }: CareersSectionProps) {
  const hasOpenings = careers.accepting && careers.openings.length > 0;

  return (
    <Section id="careers" title="Careers" intro={careers.intro}>
      {hasOpenings ? (
        <div className="grid gap-[var(--space-5)] md:grid-cols-2">
          {careers.openings.map((o) => (
            <OpeningCard key={o.title} opening={o} />
          ))}
        </div>
      ) : (
        <p className="max-w-2xl text-body-lg leading-7 text-text-secondary">
          We don't have any specific openings listed right now, but we're always glad to hear from talented
          people. If you'd be a good fit, reach out.
        </p>
      )}
      <div>
        <Button variant={hasOpenings ? "secondary" : "primary"} asChild>
          <a href={`mailto:${site.email}`}>
            <Mail size={18} strokeWidth={1.75} className="mr-1" />
            {careers.ctaLabel}
          </a>
        </Button>
      </div>
    </Section>
  );
}
