import { z } from "zod/v4";

const contentLinkSchema = z.object({
  title: z.string(),
  url: z.string(),
});

const socialSchema = z.object({
  label: z.string(),
  url: z.url(),
});

export const siteSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  taglineHighlights: z.optional(z.array(z.string())),
  email: z.email(),
  location: z.optional(z.string()),
  socials: z.array(socialSchema),
  scammerWarning: z.optional(z.string()),
});

const pillarSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const aboutSchema = z.object({
  intro: z.string(),
  paragraphs: z.array(z.string()),
  pillars: z.optional(z.array(pillarSchema)),
});

const awardSchema = z.object({
  title: z.string(),
  year: z.optional(z.union([z.number(), z.string()])),
});

const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  image: z.string(),
  order: z.optional(z.number()),
  links: z.optional(z.array(contentLinkSchema)),
});

export const teamSchema = z.array(teamMemberSchema);

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  awards: z.optional(z.array(awardSchema)),
  primaryUrl: z.url(),
  links: z.optional(z.array(contentLinkSchema)),
  image: z.optional(z.string()),
});

export const projectsSchema = z.array(projectSchema);

const openingSchema = z.object({
  title: z.string(),
  type: z.optional(z.string()),
  location: z.optional(z.string()),
  duration: z.optional(z.string()),
  image: z.optional(z.string()),
  description: z.string(),
  requirements: z.optional(z.array(z.string())),
  responsibilities: z.optional(z.array(z.string())),
  applyUrl: z.optional(z.string()),
});

export const careersSchema = z.object({
  accepting: z.boolean(),
  intro: z.string(),
  ctaLabel: z.string(),
  openings: z.array(openingSchema),
});

export type SiteContent = z.infer<typeof siteSchema>;
export type AboutContent = z.infer<typeof aboutSchema>;
export type Pillar = z.infer<typeof pillarSchema>;
export type Award = z.infer<typeof awardSchema>;
export type ContentLink = z.infer<typeof contentLinkSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamContent = z.infer<typeof teamSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectsContent = z.infer<typeof projectsSchema>;
export type Opening = z.infer<typeof openingSchema>;
export type CareersContent = z.infer<typeof careersSchema>;
