import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/primitives/Button";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1 text-body-sm", className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={i}>
            {i > 0 && <ChevronRight size={14} strokeWidth={1.75} className="text-text-disabled" />}
            {isLast ? (
              <span className="font-medium text-text-primary">{item.label}</span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={item.onClick}
                className="h-auto px-1 text-text-tertiary hover:bg-transparent hover:text-text-primary hover:underline"
              >
                {item.label}
              </Button>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
