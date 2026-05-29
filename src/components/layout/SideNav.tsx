import { type ReactNode } from "react";
import { PanelRightOpen } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/primitives/Button";

interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface SideNavProps {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  className?: string;
}

export function SideNav({
  items,
  activeId,
  onSelect,
  collapsed = false,
  onToggleCollapsed,
  className,
}: SideNavProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 flex-col border-r border-[var(--color-border-subtle)] bg-surface",
        collapsed ? "w-16" : "w-60",
        "transition-[width] duration-[var(--motion-standard)] ease-[var(--ease-out)]",
        className,
      )}
    >
      <nav className="flex flex-1 flex-col gap-[var(--space-1)] overflow-y-auto px-2.5 py-[var(--space-3)]">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onSelect?.(item.id)}
              aria-current={isActive ? "page" : undefined}
              aria-label={collapsed ? item.label : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                "h-9 w-full justify-start gap-[var(--space-3)] px-3 text-body",
                isActive && "bg-primary-soft text-primary font-medium hover:bg-primary-soft",
              )}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {onToggleCollapsed && (
        <Button
          variant="icon-only"
          size="sm"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!collapsed}
          title={collapsed ? "Expand navigation" : "Collapse navigation"}
          className={cn(
            "absolute bottom-[var(--space-3)] h-8 w-8",
            collapsed ? "right-4" : "right-[var(--space-3)]",
            "border border-[var(--color-border-subtle)] bg-surface text-text-tertiary shadow-1 hover:shadow-2",
          )}
          icon={
            <PanelRightOpen
              size={16}
              strokeWidth={1.75}
              className={cn(
                "transition-transform duration-[var(--motion-standard)] ease-[var(--ease-out)]",
                collapsed ? "rotate-180" : "",
              )}
            />
          }
        />
      )}
    </div>
  );
}
