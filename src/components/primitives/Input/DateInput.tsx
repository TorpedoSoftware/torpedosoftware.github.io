import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: "md" | "lg";
  error?: boolean;
}

const sizeClasses = {
  md: "h-9 text-body",
  lg: "h-11 text-body-lg",
};

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ size = "md", error, className, ...props }, ref) => (
    <input
      ref={ref}
      type="date"
      className={cn(
        "w-full rounded-sm border px-3 bg-[var(--color-surface-sunken)]",
        "text-text-primary",
        "transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
        "focus-visible:outline-none focus-visible:shadow-focus focus-visible:border-primary",
        error
          ? "border-danger bg-danger-soft"
          : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
        "disabled:opacity-60 disabled:pointer-events-none",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
);

DateInput.displayName = "DateInput";
