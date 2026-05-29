import { createContext, useContext, useId, useMemo, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { AlertTriangle } from "lucide-react";

// Inputs nested inside a FieldShell read this context to wire up the
// label/control association without callers having to pass ids manually.
// `inputId` is consumed by single-input primitives (TextInput, Select trigger),
// while `labelId` is for grouped controls that need aria-labelledby
// (RadioGroup, Slider).
interface FieldShellContextValue {
  inputId: string;
  labelId: string;
  hasError: boolean;
}

const FieldShellContext = createContext<FieldShellContextValue | null>(null);

export function useFieldShell(): FieldShellContextValue | null {
  return useContext(FieldShellContext);
}

interface FieldShellProps {
  label: string;
  // Optional override; when omitted FieldShell auto-generates an id and
  // injects it into descendant primitives via context.
  htmlFor?: string;
  helper?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function FieldShell({ label, htmlFor, helper, error, className, children }: FieldShellProps) {
  const generatedInputId = useId();
  const generatedLabelId = useId();
  const inputId = htmlFor ?? generatedInputId;
  const labelId = generatedLabelId;
  const ctx = useMemo<FieldShellContextValue>(
    () => ({ inputId, labelId, hasError: Boolean(error) }),
    [inputId, labelId, error],
  );

  return (
    <FieldShellContext.Provider value={ctx}>
      <div className={cn("flex flex-col gap-[var(--space-1)]", className)}>
        <label
          id={labelId}
          htmlFor={inputId}
          className="text-body-sm font-medium leading-5 text-text-secondary"
        >
          {label}
        </label>
        {children}
        {error ? (
          <p className="flex items-center gap-1 text-body-sm leading-5 text-danger">
            <AlertTriangle size={14} strokeWidth={1.75} />
            {error}
          </p>
        ) : helper ? (
          <p className="text-body-sm leading-5 text-text-tertiary">{helper}</p>
        ) : null}
      </div>
    </FieldShellContext.Provider>
  );
}
