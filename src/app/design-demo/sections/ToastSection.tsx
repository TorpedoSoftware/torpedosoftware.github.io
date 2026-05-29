import { Button, useToast } from "@/components/primitives";

export function ToastSection() {
  const { toast } = useToast();

  return (
    <section className="flex flex-col gap-[var(--space-7)]">
      <div>
        <h2 className="text-metric-lg font-semibold tracking-tight text-text-primary">Toast</h2>
        <p className="mt-1 text-body text-text-secondary">
          Bottom-right stack, max 3 visible. 4s auto-dismiss (10s for danger).
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              variant: "success",
              title: "Project saved",
              description: '"HashLib" has been updated successfully.',
            })
          }
        >
          Success toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              variant: "warning",
              title: "Large file detected",
              description: "This image exceeds 2 MB. Consider compressing it before uploading.",
            })
          }
        >
          Warning toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              variant: "danger",
              title: "Build failed",
              description: "TypeScript found 3 errors. Check the output for details.",
            })
          }
        >
          Danger toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              variant: "info",
              title: "New comment",
              description: "Someone commented on your latest blog post.",
              action: { label: "View comment", onClick: () => {} },
            })
          }
        >
          Info toast (with action)
        </Button>
      </div>
    </section>
  );
}
