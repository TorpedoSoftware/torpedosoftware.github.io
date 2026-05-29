import { Button, Popover, FieldShell, TextInput } from "@/components/primitives";

export function PopoverSection() {
  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Popover</h2>
        <p className="mt-1 text-body text-text-secondary">
          Click-triggered overlay for inline editing. Closes on outside click or Esc.
        </p>
      </div>

      <div>
        <Popover trigger={<Button variant="secondary">Edit details</Button>}>
          <div className="flex flex-col gap-4">
            <h4 className="text-body font-semibold text-text-primary">Project URL</h4>
            <FieldShell label="Repository link" helper="GitHub, DevForum, or Itch.io">
              <TextInput defaultValue="https://github.com/boatbomber/HashLib" />
            </FieldShell>
            <Button size="sm">Save</Button>
          </div>
        </Popover>
      </div>
    </section>
  );
}
