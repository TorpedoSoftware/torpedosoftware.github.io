import { type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/cn";
import { DialogHeader, DialogOverlay } from "./DialogHeader";

type SheetSide = "right" | "bottom";

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description?: string;
  side?: SheetSide;
  children: ReactNode;
}

const sideClasses: Record<SheetSide, string> = {
  right:
    "fixed right-0 top-0 z-50 h-full w-[480px] max-w-[90vw] data-[state=open]:motion-slide-from-right data-[state=closed]:motion-slide-to-right",
  bottom:
    "fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] rounded-t-lg data-[state=open]:motion-slide-from-bottom data-[state=closed]:motion-slide-to-bottom",
};

export function Sheet({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  side = "right",
  children,
}: SheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <DialogOverlay />
        <Dialog.Content className={cn("bg-surface shadow-4 focus:outline-none", sideClasses[side])}>
          <DialogHeader title={title} description={description} closeClassName="p-1.5" />
          <div className="overflow-y-auto px-[var(--space-7)] pb-[var(--space-7)]">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
