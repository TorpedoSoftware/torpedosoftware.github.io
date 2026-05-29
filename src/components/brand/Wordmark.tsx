import { useTheme } from "@/hooks/useTheme";

interface WordmarkProps {
  className?: string;
  label?: string;
}

/**
 * The Torpedo Software wordmark. Two SVG variants live in public/brand with the
 * text colors baked in (wordmark-light.svg for light canvases, wordmark-dark.svg
 * for dark ones). We pick the matching variant for the active theme.
 */
export function Wordmark({ className, label = "Torpedo Software" }: WordmarkProps) {
  const { theme } = useTheme();
  const src = theme === "dark" ? "/brand/wordmark-dark.svg" : "/brand/wordmark-light.svg";
  return <img src={src} alt={label} className={className} />;
}
