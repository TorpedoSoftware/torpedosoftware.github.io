import { forwardRef, type ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { useFieldShell } from "./FieldShell";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  size?: "md" | "lg";
  id?: string;
  "aria-labelledby"?: string;
  className?: string;
  children?: ReactNode;
}

const sizeClasses = {
  md: "h-9 text-body",
  lg: "h-11 text-body-lg",
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      options,
      placeholder = "Select…",
      disabled,
      error,
      size = "md",
      id,
      "aria-labelledby": ariaLabelledBy,
      className,
    },
    ref,
  ) => {
    const fieldCtx = useFieldShell();
    const resolvedId = id ?? fieldCtx?.inputId;
    const resolvedLabelledBy = ariaLabelledBy ?? fieldCtx?.labelId;
    return (
      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          ref={ref}
          id={resolvedId}
          aria-labelledby={resolvedLabelledBy}
          className={cn(
            "inline-flex w-full items-center justify-between gap-2 rounded-sm border px-3",
            "bg-[var(--color-surface-sunken)] text-text-primary",
            "transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
            "focus-visible:outline-none focus-visible:shadow-focus focus-visible:border-primary",
            "data-[placeholder]:text-text-disabled",
            error
              ? "border-danger bg-danger-soft"
              : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
            "disabled:opacity-60 disabled:pointer-events-none",
            sizeClasses[size],
            className,
          )}
        >
          <span className="truncate">
            <RadixSelect.Value placeholder={placeholder} />
          </span>
          <RadixSelect.Icon>
            <ChevronDown size={16} strokeWidth={1.75} className="text-text-tertiary" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={4}
            className={cn(
              "z-50 max-h-60 min-w-[var(--radix-select-trigger-width)] overflow-auto",
              "rounded-md border border-[var(--color-border-subtle)] bg-surface shadow-3",
              "data-[state=open]:motion-zoom-in data-[state=open]:data-[side=bottom]:motion-slide-from-top",
            )}
          >
            <RadixSelect.Viewport className="p-1">
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </SelectItem>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    );
  },
);

Select.displayName = "Select";

const SelectItem = forwardRef<HTMLDivElement, RadixSelect.SelectItemProps & { children: ReactNode }>(
  ({ children, className, ...props }, ref) => (
    <RadixSelect.Item
      ref={ref}
      className={cn(
        "relative flex cursor-pointer items-center rounded-sm py-1.5 pl-8 pr-3 text-body",
        "text-text-primary outline-none select-none",
        "data-[highlighted]:bg-primary-soft data-[highlighted]:text-primary",
        "data-[disabled]:text-text-disabled data-[disabled]:pointer-events-none",
        className,
      )}
      {...props}
    >
      <RadixSelect.ItemIndicator className="absolute left-2 flex items-center">
        <Check size={14} strokeWidth={1.75} />
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  ),
);

SelectItem.displayName = "SelectItem";
