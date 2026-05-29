import { forwardRef, useState, useCallback, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { evalNumericExpression } from "@/lib/numericExpression";
import { useFieldShell } from "./FieldShell";

type InputType = "text" | "number" | "currency" | "percent";
type InputSize = "md" | "lg";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  inputType?: InputType;
  size?: InputSize;
  error?: boolean;
}

const sizeClasses: Record<InputSize, string> = {
  md: "h-9 text-body",
  lg: "h-11 text-body-lg",
};

function stripFormatting(raw: string): string {
  return raw.replace(/[\s,$%]/g, "");
}

function formatCurrencyDisplay(raw: string): string {
  const num = parseFloat(stripFormatting(raw));
  if (isNaN(num)) return raw;
  return num.toLocaleString("en-US");
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      inputType = "text",
      size = "md",
      error,
      className,
      onBlur,
      onFocus,
      onChange,
      onKeyDown,
      value,
      defaultValue,
      id,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const fieldCtx = useFieldShell();
    const resolvedId = id ?? fieldCtx?.inputId;
    // While editing a numeric input, we hold a draft string so the user can
    // delete digits down to empty (or transient states like "000") without the
    // parent's value→number→string round-trip clobbering what they typed.
    const [draft, setDraft] = useState<string | null>(null);

    const isCurrency = inputType === "currency";
    const isPercent = inputType === "percent";
    const isNumeric = inputType === "number" || isCurrency || isPercent;

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        if (isNumeric) {
          const incoming = value != null ? String(value) : "";
          // Strip commas/symbols so the user edits the raw number
          setDraft(stripFormatting(incoming));
        }
        onFocus?.(e);
      },
      [isNumeric, value, onFocus],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isNumeric) setDraft(e.target.value);
        onChange?.(e);
      },
      [isNumeric, onChange],
    );

    const commitDraft = useCallback(
      (input: HTMLInputElement) => {
        if (!isNumeric || draft === null) return;
        const evaluated = evalNumericExpression(draft);
        if (evaluated === null) return;
        const evaluatedStr = String(evaluated);
        if (evaluatedStr === stripFormatting(draft)) return;
        // The draft was a math expression (e.g. "100*12") or had quirky
        // formatting (e.g. "000"). Push the canonical numeric string through
        // onChange so the parent's state catches up.
        input.value = evaluatedStr;
        onChange?.({
          target: input,
          currentTarget: input,
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      },
      [isNumeric, draft, onChange],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        commitDraft(e.currentTarget);
        setDraft(null);
        onBlur?.(e);
      },
      [commitDraft, onBlur],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isNumeric && e.key === "Enter") {
          e.preventDefault();
          commitDraft(e.currentTarget);
          setDraft(null);
          e.currentTarget.blur();
        }
        onKeyDown?.(e);
      },
      [isNumeric, commitDraft, onKeyDown],
    );

    let shownValue: typeof value;
    if (isNumeric && focused && draft !== null) {
      shownValue = draft;
    } else if (isCurrency && !focused && value != null && value !== "") {
      shownValue = formatCurrencyDisplay(String(value));
    } else {
      shownValue = value;
    }

    return (
      <div className="relative flex items-center">
        {isCurrency && <span className="pointer-events-none absolute left-3 text-text-tertiary">$</span>}
        <input
          ref={ref}
          id={resolvedId}
          type="text"
          inputMode={isNumeric ? "decimal" : undefined}
          value={shownValue ?? value}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full rounded-sm border bg-[var(--color-surface-sunken)] px-3",
            "text-text-primary placeholder:text-text-disabled",
            "transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
            "focus-visible:outline-none focus-visible:shadow-focus focus-visible:border-primary",
            error
              ? "border-danger bg-danger-soft"
              : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
            "disabled:bg-[var(--color-surface-sunken)] disabled:text-text-disabled disabled:pointer-events-none",
            sizeClasses[size],
            isCurrency && "pl-7",
            isPercent && "pr-7",
            className,
          )}
          {...props}
        />
        {isPercent && <span className="pointer-events-none absolute right-3 text-text-tertiary">%</span>}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
