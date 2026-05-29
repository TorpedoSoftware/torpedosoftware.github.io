import { EmptyState, Button } from "@/components/primitives";
import { FileText, Code2, Gamepad2 } from "lucide-react";

export function EmptyStateSection() {
  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Empty States</h2>
        <p className="mt-1 text-body text-text-secondary">
          Icon (64px tertiary) + explanation + action. No stock illustrations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-md border border-[var(--color-border-subtle)] bg-surface">
          <EmptyState
            icon={<FileText size={64} strokeWidth={1.25} />}
            title="No blog posts yet"
            description="Write your first post to share your thoughts and projects with the world."
            action={<Button size="sm">Write a post</Button>}
          />
        </div>

        <div className="rounded-md border border-[var(--color-border-subtle)] bg-surface">
          <EmptyState
            icon={<Code2 size={64} strokeWidth={1.25} />}
            title="No plugins found"
            description="Try adjusting your search filters or browse all available plugins."
            action={<Button size="sm">Browse all</Button>}
          />
        </div>

        <div className="rounded-md border border-[var(--color-border-subtle)] bg-surface">
          <EmptyState
            icon={<Gamepad2 size={64} strokeWidth={1.25} />}
            title="No games listed"
            description="Add your Roblox games to showcase them on the portfolio."
            action={<Button size="sm">Add a game</Button>}
          />
        </div>
      </div>
    </section>
  );
}
