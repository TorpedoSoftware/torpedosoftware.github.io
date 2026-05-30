import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/primitives/Button";
import { Sheet } from "@/components/primitives/Sheet";
import { ThemeToggle } from "./ThemeToggle";
import { FpsMeter } from "./FpsMeter";
import { Wordmark } from "@/components/brand/Wordmark";
import { cn } from "@/lib/cn";
import { siteData } from "@/content/site-data";
import { useActiveHeading } from "@/hooks/useActiveHeading";

interface NavItem {
  label: string;
  href: string;
}

const SECTION_LINKS: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Team", href: "/#team" },
  { label: "Projects", href: "/#projects" },
  { label: "Careers", href: "/#careers" },
  { label: "Contact", href: "/#contact" },
];

// Stable reference so useActiveHeading's effect doesn't re-run every render.
const SECTION_IDS = SECTION_LINKS.map((item) => item.href.split("#")[1]);

function isAnchor(href: string) {
  return href.includes("#");
}

function NavLink({
  item,
  activeId,
  onClick,
}: {
  item: NavItem;
  activeId: string | null;
  onClick?: () => void;
}) {
  const location = useLocation();
  const onHome = location.pathname === "/";

  if (isAnchor(item.href)) {
    const hash = item.href.split("#")[1];
    // On the home page anchors scroll smoothly. From any other route, the
    // browser navigates to "/" with the hash and react-router resolves it.
    if (onHome) {
      const active = activeId === hash;
      return (
        <a
          href={`#${hash}`}
          onClick={onClick}
          aria-current={active ? "true" : undefined}
          className={cn(
            "text-body transition-colors hover:text-text-primary",
            active ? "text-text-primary font-medium" : "text-text-secondary",
          )}
        >
          {item.label}
        </a>
      );
    }
    return (
      <Link
        to={item.href}
        onClick={onClick}
        className="text-body text-text-secondary transition-colors hover:text-text-primary"
      >
        {item.label}
      </Link>
    );
  }

  const active = location.pathname.startsWith(item.href);
  return (
    <Link
      to={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-body transition-colors hover:text-text-primary",
        active ? "text-text-primary font-medium" : "text-text-secondary",
      )}
    >
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activeId = useActiveHeading(SECTION_IDS, location.pathname);

  return (
    <header className="z-30 shrink-0 border-b border-[var(--color-border-subtle)] bg-canvas">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-[var(--space-5)] px-[var(--space-7)] md:px-[var(--space-9)]">
        <Link to="/" className="flex items-center" aria-label={siteData.name}>
          <Wordmark label={siteData.name} className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-[var(--space-7)]">
          <nav aria-label="Primary" className="hidden items-center gap-[var(--space-7)] md:flex">
            {SECTION_LINKS.map((item) => (
              <NavLink key={item.href} item={item} activeId={activeId} />
            ))}
          </nav>
          {import.meta.env.DEV && <FpsMeter />}
          <ThemeToggle />
          <Button
            variant="icon-only"
            className="md:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            icon={<Menu size={20} strokeWidth={1.75} />}
          />
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} side="right" title="Menu">
        <nav aria-label="Mobile" className="flex flex-col gap-[var(--space-5)]">
          {SECTION_LINKS.map((item) => (
            <NavLink key={item.href} item={item} activeId={activeId} onClick={() => setMobileOpen(false)} />
          ))}
        </nav>
      </Sheet>
    </header>
  );
}
