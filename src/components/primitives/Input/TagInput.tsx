import { forwardRef, useState, useCallback, useRef, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onChange,
      placeholder = "Type and press Enter…",
      disabled,
      error,
      className,
    },
    ref,
  ) => {
    const [internalTags, setInternalTags] = useState(defaultValue);
    const tags = controlledValue ?? internalTags;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setTags = useCallback(
      (next: string[]) => {
        if (!controlledValue) setInternalTags(next);
        onChange?.(next);
      },
      [controlledValue, onChange],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        if (e.key === "Enter" && input.value.trim()) {
          e.preventDefault();
          const tag = input.value.trim();
          if (!tags.includes(tag)) {
            setTags([...tags, tag]);
          }
          input.value = "";
        } else if (e.key === "Backspace" && !input.value && tags.length > 0) {
          setTags(tags.slice(0, -1));
        }
      },
      [tags, setTags],
    );

    const removeTag = useCallback(
      (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
      },
      [tags, setTags],
    );

    return (
      <div
        className={cn(
          "flex min-h-9 flex-wrap items-center gap-1.5 rounded-sm border px-2 py-1",
          "bg-[var(--color-surface-sunken)] cursor-text",
          "transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
          "focus-within:shadow-focus focus-within:border-primary",
          error
            ? "border-danger bg-danger-soft"
            : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
          disabled && "opacity-60 pointer-events-none",
          className,
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-body-sm text-primary"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-full p-0.5 hover:bg-primary/10"
              aria-label={`Remove ${tag}`}
            >
              <X size={12} strokeWidth={1.75} />
            </button>
          </span>
        ))}
        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          type="text"
          disabled={disabled}
          placeholder={tags.length === 0 ? placeholder : ""}
          onKeyDown={handleKeyDown}
          className="min-w-[80px] flex-1 bg-transparent py-1 text-body text-text-primary outline-none placeholder:text-text-disabled"
        />
      </div>
    );
  },
);

TagInput.displayName = "TagInput";
