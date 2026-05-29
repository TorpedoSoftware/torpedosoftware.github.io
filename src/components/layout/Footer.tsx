import { ExternalLink } from "lucide-react";
import { siteData } from "@/content/site-data";
import { SOCIAL_ICONS } from "@/content/icons";
import { MaskIcon } from "@/components/sections/shared";

export function Footer() {
  return (
    <footer className="z-40 shrink-0 border-t border-[var(--color-border-subtle)] bg-canvas py-[var(--space-3)] text-body-sm text-text-secondary">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-[var(--space-7)] md:px-[var(--space-9)]">
        <p>
          © {new Date().getFullYear()} <span className="hidden sm:inline">{siteData.name} LLC</span>
        </p>
        <nav
          aria-label="Social"
          className="flex items-center gap-x-[var(--space-3)] sm:gap-x-[var(--space-4)]"
        >
          {siteData.socials.map((s) => {
            const icon = SOCIAL_ICONS[s.label];
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary transition-colors hover:text-primary"
                aria-label={s.label}
              >
                {icon ? (
                  <MaskIcon src={icon} className="block h-[18px] w-[18px] bg-current" />
                ) : (
                  <ExternalLink size={18} strokeWidth={1.75} />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
