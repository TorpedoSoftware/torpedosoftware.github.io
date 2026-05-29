import { useState } from "react";
import { Alert, Button } from "@/components/primitives";

export function AlertsSection() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Alerts</h2>
        <p className="mt-1 text-body text-text-secondary">
          Inline callouts for all 4 semantic variants. Persistent or dismissible.
        </p>
      </div>

      <div className="flex max-w-2xl flex-col gap-4">
        <Alert variant="success">Plugin published successfully. It is now live on the marketplace.</Alert>

        <Alert variant="warning">
          This project has not been updated in over 6 months. Consider archiving it.
        </Alert>

        <Alert variant="danger">Build failed with 3 type errors. Check the console for details.</Alert>

        <Alert
          variant="info"
          action={
            <Button variant="tertiary" size="sm">
              View
            </Button>
          }
        >
          A new blog post draft is ready for review. Last edited May 20, 2026.
        </Alert>

        {!dismissed && (
          <Alert variant="warning" dismissible onDismiss={() => setDismissed(true)}>
            This is a dismissible alert. Click the X to remove it.
          </Alert>
        )}
      </div>
    </section>
  );
}
