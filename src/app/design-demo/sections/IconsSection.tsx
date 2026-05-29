import {
  Plus,
  Minus,
  ChevronRight,
  ArrowUpDown,
  Info,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Pencil,
  Gamepad2,
  GitCompare,
  Code2,
  Puzzle,
  FileText,
} from "lucide-react";

const iconEntries = [
  { name: "plus", Icon: Plus, role: "Add" },
  { name: "minus", Icon: Minus, role: "Remove" },
  { name: "chevron-right", Icon: ChevronRight, role: "Expand" },
  { name: "arrow-up-down", Icon: ArrowUpDown, role: "Sort" },
  { name: "info", Icon: Info, role: "Info" },
  { name: "alert-triangle", Icon: AlertTriangle, role: "Warning" },
  { name: "check-circle-2", Icon: CheckCircle2, role: "Success" },
  { name: "alert-octagon", Icon: AlertOctagon, role: "Danger" },
  { name: "pencil", Icon: Pencil, role: "Edit" },
  { name: "gamepad-2", Icon: Gamepad2, role: "Game" },
  { name: "git-compare", Icon: GitCompare, role: "Compare" },
  { name: "code-2", Icon: Code2, role: "Source Code" },
  { name: "puzzle", Icon: Puzzle, role: "Plugin" },
  { name: "file-text", Icon: FileText, role: "Blog Post" },
];

const sizes = [16, 20, 24, 32] as const;

export function IconsSection() {
  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Icons</h2>
        <p className="mt-1 text-body text-text-secondary">
          Lucide icons at 1.75px stroke weight. Sizes: 16, 20, 24, 32.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="text-body-sm">
          <thead>
            <tr className="text-left text-overline font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              <th className="py-2 pr-6">Name</th>
              <th className="py-2 pr-6">Role</th>
              {sizes.map((s) => (
                <th key={s} className="py-2 pr-6 text-center">
                  {s}px
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {iconEntries.map(({ name, Icon, role }) => (
              <tr key={name} className="border-t border-[var(--color-border-subtle)]">
                <td className="py-2 pr-6 text-text-primary">
                  <code>{name}</code>
                </td>
                <td className="py-2 pr-6 text-text-secondary">{role}</td>
                {sizes.map((s) => (
                  <td key={s} className="py-2 pr-6 text-center text-text-primary">
                    <Icon size={s} strokeWidth={1.75} className="inline-block" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
