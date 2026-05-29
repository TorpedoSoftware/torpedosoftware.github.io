import about from "@/content/about.yaml";
import team from "@/content/team.yaml";
import projects from "@/content/projects.yaml";
import careers from "@/content/careers.yaml";
import { aboutSchema, teamSchema, projectsSchema, careersSchema } from "@/content/schemas";
import { siteData } from "@/content/site-data";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Hero } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CareersSection } from "@/components/sections/CareersSection";
import { ContactSection } from "@/components/sections/ContactSection";

const aboutData = aboutSchema.parse(about);
const teamData = teamSchema.parse(team);
const projectsData = projectsSchema.parse(projects);
const careersData = careersSchema.parse(careers);

export function HomePage() {
  useDocumentTitle("Torpedo Software");
  return (
    <>
      <Hero site={siteData} />
      <AboutSection about={aboutData} />
      <TeamSection team={teamData} />
      <ProjectsSection projects={projectsData} />
      <CareersSection careers={careersData} site={siteData} />
      <ContactSection site={siteData} />
    </>
  );
}
