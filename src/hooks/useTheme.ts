import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// Theme preference is the only thing this app writes to localStorage. Do not
// repurpose this key for anything other than "light" | "dark".
const STORAGE_KEY = "bb-theme";

function getSnapshot(): Theme {
  return (document.documentElement.dataset.theme as Theme) || "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(callback: () => void): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setTheme(getSnapshot() === "light" ? "dark" : "light");
  }, [setTheme]);

  return { theme, setTheme, toggle } as const;
}

// Eagerly apply saved preference before React hydrates
if (typeof window !== "undefined") {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  document.documentElement.dataset.theme = saved ?? "dark";
}
