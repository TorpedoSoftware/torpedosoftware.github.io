import type { TeamContent, TeamMember } from "@/content/schemas";
import { Section } from "./Section";
import { SocialLinks } from "./shared";

interface TeamSectionProps {
  team: TeamContent;
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center gap-[var(--space-3)] text-center">
      <img
        src={member.image}
        alt={member.name}
        className="h-32 w-32 rounded-full object-cover ring-2 ring-[var(--color-primary-soft)]"
      />
      <div>
        <h3 className="text-heading-sm text-text-primary">{member.name}</h3>
        <p className="text-body-sm text-text-secondary">{member.role}</p>
      </div>
      <SocialLinks links={member.links} />
    </div>
  );
}

export function TeamSection({ team }: TeamSectionProps) {
  const members = [...team].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <Section id="team" title="Meet the team" bg="alt">
      <div className="grid grid-cols-2 gap-[var(--space-8)] sm:grid-cols-3 md:grid-cols-4">
        {members.map((m) => (
          <MemberCard key={m.name} member={m} />
        ))}
        <a href="#careers" className="group flex flex-col items-center gap-[var(--space-3)] text-center">
          <span className="flex h-32 w-32 items-center justify-center rounded-full bg-surface-sunken ring-2 ring-dashed ring-[var(--color-border)] transition-colors group-hover:ring-primary">
            <img
              src="/team/silhouette.png"
              alt=""
              className="h-32 w-32 rounded-full object-cover opacity-60"
            />
          </span>
          <div>
            <h3 className="text-heading-sm text-text-primary group-hover:text-primary">You?</h3>
            <p className="text-body-sm text-text-secondary">View open roles</p>
          </div>
        </a>
      </div>
    </Section>
  );
}
