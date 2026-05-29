import { Mail } from "lucide-react";
import type { SiteContent } from "@/content/schemas";
import { SOCIAL_ICONS } from "@/content/icons";
import { Section } from "./Section";
import { Button } from "@/components/primitives/Button";
import { MaskIcon } from "./shared";

interface ContactSectionProps {
  site: SiteContent;
}

export function ContactSection({ site }: ContactSectionProps) {
  return (
    <Section
      id="contact"
      title="Contact"
      intro="The best way to reach us is email. You can also find us on the platforms below."
      align="left"
      bg="alt"
    >
      <div className="flex flex-col gap-[var(--space-7)]">
        <div className="flex flex-wrap gap-[var(--space-3)]">
          <Button variant="primary" asChild>
            <a href={`mailto:${site.email}`}>
              <Mail size={18} strokeWidth={1.75} className="mr-1" />
              {site.email}
            </a>
          </Button>
          {site.socials.map((s) => {
            const icon = SOCIAL_ICONS[s.label];
            return (
              <Button key={s.label} variant="secondary" asChild>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {icon && <MaskIcon src={icon} className="mr-1 inline-block h-[18px] w-[18px] bg-current" />}
                  {s.label}
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
