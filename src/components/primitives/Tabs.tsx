import { forwardRef, type ReactNode } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/cn";

interface TabItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  children: ReactNode;
}

export function Tabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  className,
  children,
}: TabsProps) {
  return (
    <RadixTabs.Root
      value={value}
      defaultValue={defaultValue ?? tabs[0]?.value}
      onValueChange={onValueChange}
      orientation={orientation}
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-col gap-[var(--space-7)]" : "flex-row gap-[var(--space-5)]",
        className,
      )}
    >
      <RadixTabs.List
        className={cn(
          "flex shrink-0",
          orientation === "horizontal"
            ? "overflow-x-auto whitespace-nowrap border-b border-[var(--color-border-subtle)] mask-fade-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "flex-col border-r border-[var(--color-border-subtle)]",
        )}
      >
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={cn(
              "relative px-[var(--space-5)] py-[var(--space-3)] text-body font-medium",
              "text-text-secondary transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out)]",
              "hover:text-text-primary",
              "data-[state=active]:text-primary",
              "focus-visible:outline-none focus-visible:shadow-focus focus-visible:z-10",
              "disabled:text-text-disabled disabled:pointer-events-none",
              orientation === "horizontal" &&
                "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:scale-x-0 after:bg-primary after:transition-transform after:duration-[var(--motion-fast)] after:ease-[var(--ease-out)] data-[state=active]:after:scale-x-100",
              orientation === "vertical" &&
                "text-left after:absolute after:inset-y-0 after:right-0 after:w-0.5 after:scale-y-0 after:bg-primary after:transition-transform after:duration-[var(--motion-fast)] after:ease-[var(--ease-out)] data-[state=active]:after:scale-y-100",
            )}
          >
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {children}
    </RadixTabs.Root>
  );
}

export const TabContent = forwardRef<HTMLDivElement, RadixTabs.TabsContentProps>(
  ({ className, ...props }, ref) => (
    <RadixTabs.Content
      ref={ref}
      className={cn("focus-visible:outline-none focus-visible:shadow-focus rounded-sm", className)}
      {...props}
    />
  ),
);

TabContent.displayName = "TabContent";
