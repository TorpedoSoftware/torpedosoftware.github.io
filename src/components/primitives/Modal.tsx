import { type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/cn";
import { DialogHeader, DialogOverlay } from "./DialogHeader";

type ModalSize = "md" | "lg" | "xl";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description?: string;
  size?: ModalSize;
  children: ReactNode;
}

const sizeClasses: Record<ModalSize, string> = {
  md: "max-w-[560px]",
  lg: "max-w-[720px]",
  xl: "max-w-[960px]",
};

export function Modal({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  size = "md",
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <DialogOverlay />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
            "rounded-lg bg-surface shadow-4",
            "data-[state=open]:motion-zoom-in data-[state=closed]:motion-zoom-out",
            "focus:outline-none",
            sizeClasses[size],
          )}
        >
          <DialogHeader
            title={title}
            description={description}
            closeClassName="inline-flex h-9 w-9 items-center justify-center"
          />
          <div className="px-[var(--space-7)] pb-[var(--space-7)]">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
