import { createContext, useCallback, useContext, useState, useRef, type ReactNode } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { X, CheckCircle2, AlertTriangle, AlertOctagon, Info } from "lucide-react";
import { cn } from "@/lib/cn";

type ToastVariant = "success" | "warning" | "danger" | "info";

interface ToastData {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const variantStyles: Record<ToastVariant, string> = {
  success: "border-[var(--color-success)] bg-success-soft",
  warning: "border-[var(--color-warning)] bg-warning-soft",
  danger: "border-[var(--color-danger)] bg-danger-soft",
  info: "border-[var(--color-info)] bg-info-soft",
};

const variantIcons: Record<ToastVariant, ReactNode> = {
  success: <CheckCircle2 size={18} strokeWidth={1.75} className="text-success" />,
  warning: <AlertTriangle size={18} strokeWidth={1.75} className="text-warning" />,
  danger: <AlertOctagon size={18} strokeWidth={1.75} className="text-danger" />,
  info: <Info size={18} strokeWidth={1.75} className="text-info" />,
};

const DISMISS_DELAY: Record<ToastVariant, number> = {
  success: 4000,
  warning: 4000,
  danger: 10000,
  info: 4000,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const counter = useRef(0);

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    const id = String(++counter.current);
    setToasts((prev) => [...prev.slice(-2), { ...data, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {toasts.map((t) => (
          <RadixToast.Root
            key={t.id}
            duration={DISMISS_DELAY[t.variant]}
            onOpenChange={(open) => {
              if (!open) dismiss(t.id);
            }}
            className={cn(
              "group flex items-start gap-3 rounded-md border p-4 shadow-3",
              "data-[state=open]:motion-slide-from-bottom",
              "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
              "data-[swipe=end]:motion-slide-to-right",
              variantStyles[t.variant],
            )}
          >
            <span className="mt-0.5 shrink-0">{variantIcons[t.variant]}</span>
            <div className="flex-1">
              <RadixToast.Title className="text-body font-medium text-text-primary">
                {t.title}
              </RadixToast.Title>
              {t.description && (
                <RadixToast.Description className="mt-0.5 text-body-sm text-text-secondary">
                  {t.description}
                </RadixToast.Description>
              )}
              {t.action && (
                <RadixToast.Action
                  altText={t.action.label}
                  onClick={t.action.onClick}
                  className="mt-2 text-body-sm font-medium text-primary hover:underline"
                >
                  {t.action.label}
                </RadixToast.Action>
              )}
            </div>
            <RadixToast.Close
              className="shrink-0 rounded-sm p-1 text-text-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:shadow-focus"
              aria-label="Dismiss"
            >
              <X size={14} strokeWidth={1.75} />
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="fixed bottom-[var(--space-7)] right-[var(--space-7)] z-[100] flex w-[380px] max-w-[calc(100vw-2rem)] flex-col gap-2" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
