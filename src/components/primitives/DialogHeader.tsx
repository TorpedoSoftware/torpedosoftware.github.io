import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface DialogHeaderProps {
  title: string;
  description?: string;
  closeClassName?: string;
}

export function DialogHeader({ title, description, closeClassName }: DialogHeaderProps) {
  return (
    <div className="flex items-start justify-between px-[var(--space-7)] pt-[var(--space-7)] pb-[var(--space-3)]">
      <div>
        <Dialog.Title className="text-heading-sm font-semibold leading-7 text-text-primary">
          {title}
        </Dialog.Title>
        {description && (
          <Dialog.Description className="mt-1 text-body text-text-secondary">
            {description}
          </Dialog.Description>
        )}
      </div>
      <Dialog.Close
        className={cn(
          "shrink-0 rounded-sm text-text-tertiary",
          "hover:bg-[var(--color-surface-sunken)] hover:text-text-primary",
          "focus-visible:outline-none focus-visible:shadow-focus",
          closeClassName,
        )}
        aria-label="Close"
      >
        <X size={18} strokeWidth={1.75} />
      </Dialog.Close>
    </div>
  );
}

export function DialogOverlay() {
  return (
    <Dialog.Overlay className="fixed inset-0 z-50 bg-[var(--color-overlay)] backdrop-blur-[4px] data-[state=open]:motion-fade-in data-[state=closed]:motion-fade-out" />
  );
}
