import { ExternalLink, Trophy } from "lucide-react";
import type { Award, ContentLink } from "@/content/schemas";
import { SOCIAL_ICONS } from "@/content/icons";
import { Button } from "@/components/primitives/Button";

export function AwardBadges({ awards }: { awards?: Award[] }) {
  if (!awards || awards.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-[var(--space-2)]">
      {awards.map((a) => (
        <span
          key={a.title}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-body-sm font-medium text-accent"
        >
          <Trophy size={12} strokeWidth={2} />
          {a.title} {a.year ? `(${a.year})` : ""}
        </span>
      ))}
    </div>
  );
}

export function SecondaryLinks({ links }: { links?: ContentLink[] }) {
  if (!links || links.length === 0) return null;
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-[var(--space-3)]">
      {links.map((link) => (
        <Button key={link.url} variant="secondary" size="sm" asChild>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.title}
            <ExternalLink size={14} strokeWidth={1.75} />
          </a>
        </Button>
      ))}
    </div>
  );
}

export function SocialLinks({ links }: { links?: ContentLink[] }) {
  if (!links || links.length === 0) return null;
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-[var(--space-4)]">
      {links.map((link) => {
        const icon = SOCIAL_ICONS[link.title];
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.title}
            className="text-text-tertiary transition-colors hover:text-primary"
          >
            {icon ? (
              <MaskIcon src={icon} className="block h-5 w-5 bg-current" />
            ) : (
              <ExternalLink size={20} strokeWidth={1.75} />
            )}
          </a>
        );
      })}
    </div>
  );
}

export function ArtCredit({ name, url, center }: { name: string; url: string; center?: boolean }) {
  return (
    <p className={`mt-1 text-xs text-text-tertiary${center ? " text-center" : ""}`}>
      Art by{" "}
      <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:text-text-secondary">
        {name}
      </a>
    </p>
  );
}

export function MaskIcon({
  src,
  className = "inline-block h-[18px] w-[18px] bg-current",
}: {
  src: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        mask: `url(${src}) center / contain no-repeat`,
        WebkitMask: `url(${src}) center / contain no-repeat`,
      }}
    />
  );
}
