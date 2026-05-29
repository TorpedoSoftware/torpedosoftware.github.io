import { useState } from "react";
import { Button, Modal, Sheet, FieldShell, TextInput } from "@/components/primitives";

export function ModalSheetSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Modal &amp; Sheet</h2>
        <p className="mt-1 text-body text-text-secondary">
          Center modal (md/lg/xl), right sheet (480px), bottom sheet (mobile).
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>
        <Button variant="secondary" onClick={() => setSheetOpen(true)}>
          Open Sheet (right)
        </Button>
        <Button variant="secondary" onClick={() => setBottomSheetOpen(true)}>
          Open Sheet (bottom)
        </Button>
      </div>

      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Delete project"
        description='Remove "HashLib" from your portfolio? This cannot be undone.'
        size="md"
      >
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setModalOpen(false)}>
            Delete
          </Button>
        </div>
      </Modal>

      <Sheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="New Project"
        description="Add a new project to your portfolio."
        side="right"
      >
        <div className="flex flex-col gap-5 pt-4">
          <FieldShell label="Project name">
            <TextInput placeholder="e.g., SmartBone" />
          </FieldShell>
          <FieldShell label="Description">
            <TextInput placeholder="What does this project do?" />
          </FieldShell>
          <FieldShell label="Repository URL">
            <TextInput placeholder="https://github.com/boatbomber/..." />
          </FieldShell>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setSheetOpen(false)}>Create</Button>
          </div>
        </div>
      </Sheet>

      <Sheet open={bottomSheetOpen} onOpenChange={setBottomSheetOpen} title="Quick Edit" side="bottom">
        <div className="flex flex-col gap-4 pt-4">
          <p className="text-body text-text-secondary">
            Bottom sheet for mobile. Covers 60-90% of viewport height.
          </p>
          <Button onClick={() => setBottomSheetOpen(false)}>Done</Button>
        </div>
      </Sheet>
    </section>
  );
}
