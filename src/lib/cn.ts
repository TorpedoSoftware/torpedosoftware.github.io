import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about our custom typography utilities and theme colors
// (defined in src/styles/globals.css and src/styles/tokens.css). Without this,
// it cannot disambiguate `text-body` (font-size) from `text-primary-contrast`
// (color) and silently drops one of them.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-xl",
        "display-lg",
        "display-md",
        "heading-lg",
        "heading-md",
        "heading-sm",
        "body-lg",
        "body",
        "body-sm",
        "caption",
        "overline",
        "metric-xl",
        "metric-lg",
        "metric-md",
      ],
      color: [
        "primary",
        "primary-hover",
        "primary-pressed",
        "primary-soft",
        "primary-contrast",
        "accent",
        "accent-soft",
        "success",
        "success-soft",
        "warning",
        "warning-soft",
        "danger",
        "danger-hover",
        "danger-pressed",
        "danger-soft",
        "info",
        "info-soft",
        "canvas",
        "surface",
        "surface-raised",
        "surface-sunken",
        "border-subtle",
        "border-default",
        "border-strong",
        "text-primary",
        "text-secondary",
        "text-tertiary",
        "text-disabled",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
