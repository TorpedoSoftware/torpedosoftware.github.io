import type { ProjectsContent, Project } from "@/content/schemas";
import { Section } from "./Section";
import { AwardBadges, SecondaryLinks } from "./shared";

interface ProjectsSectionProps {
  projects: ProjectsContent;
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-[var(--color-border-subtle)] bg-surface transition-shadow hover:shadow-2">
      <a
        href={project.primaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-0"
        aria-label={project.title}
      />
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className={`w-full object-cover ${featured ? "aspect-[21/9]" : "aspect-video"}`}
        />
      )}
      <div
        className={`flex flex-col gap-[var(--space-4)] ${featured ? "p-[var(--space-7)]" : "p-[var(--space-5)]"}`}
      >
        <h3
          className={`text-text-primary group-hover:text-primary ${featured ? "text-heading-lg" : "text-heading-md"}`}
        >
          {project.title}
        </h3>
        <p
          className={`text-text-secondary ${featured ? "max-w-3xl text-body-lg leading-7" : "flex-1 text-body"}`}
        >
          {project.description}
        </p>
        <AwardBadges awards={project.awards} />
        <SecondaryLinks links={project.links} />
      </div>
    </div>
  );
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [featured, ...rest] = projects;

  return (
    <Section id="projects" title="Projects">
      {featured && <ProjectCard project={featured} featured />}
      {rest.length > 0 && (
        <div className="grid gap-[var(--space-5)] md:grid-cols-2">
          {rest.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      )}
    </Section>
  );
}
