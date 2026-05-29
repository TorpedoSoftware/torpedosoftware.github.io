import site from "@/content/site.yaml";
import { siteSchema } from "@/content/schemas";

export const siteData = siteSchema.parse(site);
