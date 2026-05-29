import { useState } from "react";
import { SideNav } from "@/components/layout/SideNav";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Home, Gamepad2, Puzzle, Code2, FileText } from "lucide-react";

const navItems = [
  {
    id: "home",
    label: "Home",
    icon: <Home size={20} strokeWidth={1.75} />,
  },
  {
    id: "games",
    label: "Games",
    icon: <Gamepad2 size={20} strokeWidth={1.75} />,
  },
  {
    id: "plugins",
    label: "Plugins",
    icon: <Puzzle size={20} strokeWidth={1.75} />,
  },
  {
    id: "open-source",
    label: "Open Source",
    icon: <Code2 size={20} strokeWidth={1.75} />,
  },
  {
    id: "blog",
    label: "Blog",
    icon: <FileText size={20} strokeWidth={1.75} />,
  },
];

export function NavigationSection() {
  const [activeId, setActiveId] = useState("home");

  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Navigation</h2>
        <p className="mt-1 text-body text-text-secondary">Side nav (expanded + collapsed) and breadcrumbs.</p>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Side nav (expanded)</h4>
        <div className="h-64 w-60 overflow-hidden rounded-md border border-[var(--color-border-subtle)]">
          <SideNav items={navItems} activeId={activeId} onSelect={setActiveId} />
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Side nav (collapsed)</h4>
        <div className="h-64 w-16 overflow-hidden rounded-md border border-[var(--color-border-subtle)]">
          <SideNav items={navItems} activeId={activeId} onSelect={setActiveId} collapsed />
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Breadcrumbs</h4>
        <Breadcrumbs
          items={[
            { label: "Projects", onClick: () => {} },
            { label: "Open Source", onClick: () => {} },
            { label: "HashLib" },
          ]}
        />
      </div>
    </section>
  );
}
