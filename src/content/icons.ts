// Keys are social labels from site.yaml. Typed with an optional value so that
// accessing an unmapped label is a compile-time `string | undefined`, forcing
// callers to guard rather than silently passing `undefined` into an icon.
export const SOCIAL_ICONS: Record<string, string | undefined> = {
  BuyMeACoffee: "/logos/buy-me-a-coffee.svg",
  GitHub: "/logos/github.svg",
  Itch: "/logos/itch.svg",
  LinkedIn: "/logos/linkedin.svg",
  Patreon: "/logos/patreon.svg",
  RobloxStudio: "/logos/roblox-studio.svg",
  Roblox: "/logos/roblox.svg",
  Twitter: "/logos/twitter.svg",
};
