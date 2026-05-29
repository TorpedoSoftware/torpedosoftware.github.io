import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";
import { Spinner } from "./Progress/Spinner";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "danger" | "icon-only";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  // When true, render as the child element (an anchor, Link, etc.) with the
  // button's classes applied via Radix Slot. The child takes care of its own
  // semantics, so loading/icon are ignored.
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-contrast hover:bg-primary-hover active:bg-primary-pressed shadow-1 hover:shadow-2",
  secondary:
    "border border-[var(--color-border)] bg-surface text-text-primary hover:bg-primary-soft active:bg-primary-soft",
  tertiary: "text-primary hover:bg-primary-soft active:bg-primary-soft",
  ghost: "text-text-secondary hover:bg-[var(--color-surface-sunken)] active:bg-[var(--color-surface-sunken)]",
  danger: "bg-danger text-white hover:bg-danger-hover active:bg-danger-pressed shadow-1",
  "icon-only":
    "text-text-secondary hover:bg-[var(--color-surface-sunken)] active:bg-[var(--color-surface-sunken)]",
};

// WCAG 2.5.5 minimum target size on touch devices is 44px. The visible
// button height stays the same so the design language is preserved on
// pointer-fine devices, but on pointer-coarse (touch) we extend an
// invisible ::before hit area to satisfy the guideline. Uses Tailwind's
// arbitrary media-query variant since the project's Tailwind v4 build
// doesn't ship a `pointer-coarse:` shorthand by default.
const TOUCH_HIT_AREA =
  "relative [@media(pointer:coarse)]:before:absolute [@media(pointer:coarse)]:before:content-[''] [@media(pointer:coarse)]:before:left-0 [@media(pointer:coarse)]:before:right-0 [@media(pointer:coarse)]:before:-top-2 [@media(pointer:coarse)]:before:-bottom-2";

const sizeClasses: Record<ButtonSize, string> = {
  sm: `h-7 px-3 text-body-sm gap-1.5 rounded-sm ${TOUCH_HIT_AREA}`,
  md: `h-9 px-4 text-body gap-2 rounded-sm ${TOUCH_HIT_AREA}`,
  lg: "h-11 px-5 text-body-lg gap-2.5 rounded-sm",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm: `h-7 w-7 rounded-sm ${TOUCH_HIT_AREA}`,
  md: `h-9 w-9 rounded-sm ${TOUCH_HIT_AREA}`,
  lg: "h-11 w-11 rounded-sm",
};

const spinnerSizes: Record<ButtonSize, number> = { sm: 14, md: 16, lg: 18 };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      children,
      className,
      disabled,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const isIconOnly = variant === "icon-only";
    const classes = cn(
      "inline-flex items-center justify-center font-medium select-none",
      "transition-all duration-[var(--motion-fast)] ease-[var(--ease-out)]",
      "focus-visible:outline-none focus-visible:shadow-focus",
      "disabled:opacity-60 disabled:pointer-events-none",
      "active:scale-[0.98]",
      variantClasses[variant],
      isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
      className,
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button ref={ref} disabled={disabled || loading} className={classes} {...props}>
        {loading ? (
          <Spinner size={spinnerSizes[size]} />
        ) : (
          <>
            {icon && <span className="shrink-0">{icon}</span>}
            {!isIconOnly && children}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
