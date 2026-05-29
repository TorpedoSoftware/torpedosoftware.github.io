import { type ReactNode } from "react";
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from "lucide-react";
import { cn } from "@/lib/cn";

type AlertVariant = "success" | "warning" | "danger" | "info";

interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: ReactNode;
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  success: "border-[var(--color-success)] bg-success-soft text-success",
  warning: "border-[var(--color-warning)] bg-warning-soft text-warning",
  danger: "border-[var(--color-danger)] bg-danger-soft text-danger",
  info: "border-[var(--color-info)] bg-info-soft text-info",
};

const icons: Record<AlertVariant, ReactNode> = {
  success: <CheckCircle2 size={18} strokeWidth={1.75} />,
  warning: <AlertTriangle size={18} strokeWidth={1.75} />,
  danger: <AlertOctagon size={18} strokeWidth={1.75} />,
  info: <Info size={18} strokeWidth={1.75} />,
};

export function Alert({ variant = "info", children, dismissible, onDismiss, action, className }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn("flex items-start gap-3 rounded-md border p-4", variantStyles[variant], className)}
    >
      <span className="mt-0.5 shrink-0">{icons[variant]}</span>
      <div className="flex-1 text-body text-text-primary">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
      {dismissible && (
        <button
          onClick={onDismiss}
          className="shrink-0 rounded-sm p-1 text-text-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:shadow-focus"
          aria-label="Dismiss"
        >
          <X size={14} strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
}
