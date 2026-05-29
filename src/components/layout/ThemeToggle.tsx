import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/primitives/Button";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();

  return (
    <Button
      variant="icon-only"
      onClick={toggle}
      className={className}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      icon={theme === "light" ? <Moon size={20} strokeWidth={1.75} /> : <Sun size={20} strokeWidth={1.75} />}
    />
  );
}
