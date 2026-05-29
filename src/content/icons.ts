// Keys are social labels from site.yaml. Typed with an optional value so that
// accessing an unmapped label is a compile-time `string | undefined`, forcing
// callers to guard rather than silently passing `undefined` into an icon.
export const SOCIAL_ICONS: Record<string, string | undefined> = {
  GitHub: "/logos/github.svg",
  Twitter: "/logos/twitter.svg",
  LinkedIn: "/social/linkedin.svg",
  Roblox: "/logos/roblox.svg",
};
