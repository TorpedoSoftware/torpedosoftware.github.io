import { Button } from "@/components/primitives";
import { Plus, Trash2, Download, Settings } from "lucide-react";

const variants = ["primary", "secondary", "tertiary", "ghost", "danger"] as const;
const sizes = ["sm", "md", "lg"] as const;

export function ButtonsSection() {
  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Buttons</h2>
        <p className="mt-1 text-body text-text-secondary">
          6 variants, 3 sizes, all states including loading.
        </p>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Variants (md)</h4>
        <div className="flex flex-wrap items-center gap-3">
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
          <Button variant="icon-only" aria-label="Settings">
            <Settings size={18} strokeWidth={1.75} />
          </Button>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">Sizes (primary)</h4>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((s) => (
            <Button key={s} size={s}>
              Size {s}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">With icons</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<Plus size={16} strokeWidth={1.75} />}>New Project</Button>
          <Button variant="secondary" icon={<Download size={16} strokeWidth={1.75} />}>
            Export
          </Button>
          <Button variant="danger" icon={<Trash2 size={16} strokeWidth={1.75} />}>
            Delete
          </Button>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-body font-semibold text-text-primary">States</h4>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button variant="secondary" loading>
            Loading
          </Button>
        </div>
      </div>
    </section>
  );
}
