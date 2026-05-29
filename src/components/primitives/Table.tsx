import {
  forwardRef,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
  type HTMLAttributes,
  type ThHTMLAttributes,
  type TdHTMLAttributes,
} from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/cn";

type Density = "comfortable" | "compact" | "dense";

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  density?: Density;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ density = "comfortable", className, children, ...props }, ref) => (
    <div className="overflow-x-auto scroll-shadow-x">
      <table
        ref={ref}
        data-density={density}
        className={cn("w-full border-collapse text-body", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  ),
);

Table.displayName = "Table";

export function TableHeader({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("sticky top-0 z-10 bg-[var(--color-surface-sunken)]", className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn(
        "[&_tr]:border-b [&_tr]:border-[var(--color-border-subtle)]",
        "[&_tr:hover]:bg-[var(--color-primary-soft)]/40",
        "group-data-[density=compact]:odd:[&_tr]:bg-[var(--color-surface-sunken)]/50",
        "group-data-[density=dense]:odd:[&_tr]:bg-[var(--color-surface-sunken)]/50",
        className,
      )}
      {...props}
    >
      {children}
    </tbody>
  );
}

export function TableRow({ className, children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-[var(--color-border-subtle)] transition-colors duration-[var(--motion-instant)]",
        "hover:bg-primary-soft/40",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

type SortDirection = "asc" | "desc" | null;

interface SortableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortDirection?: SortDirection;
  onSort?: () => void;
  numeric?: boolean;
  children: ReactNode;
}

export function TableHeaderCell({
  sortDirection,
  onSort,
  numeric,
  className,
  children,
  ...props
}: SortableHeaderCellProps) {
  const sortable = onSort != null;
  const Icon = sortDirection === "asc" ? ArrowUp : sortDirection === "desc" ? ArrowDown : ArrowUpDown;

  return (
    <th
      className={cn(
        "px-[var(--space-4)] py-[var(--space-3)] text-body-sm font-semibold uppercase tracking-[0.08em] text-text-tertiary",
        numeric ? "text-right" : "text-left",
        "[[data-density=comfortable]_&]:h-11 [[data-density=compact]_&]:h-9 [[data-density=dense]_&]:h-7",
        sortable && "cursor-pointer select-none hover:text-text-primary",
        className,
      )}
      onClick={onSort}
      {...props}
    >
      <span className={cn("inline-flex items-center gap-1", numeric && "justify-end")}>
        {children}
        {sortable && (
          <Icon
            size={14}
            strokeWidth={1.75}
            className={cn("transition-opacity", sortDirection ? "opacity-100" : "opacity-40")}
          />
        )}
      </span>
    </th>
  );
}

export function TableCell({
  className,
  children,
  numeric,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <td
      className={cn(
        "px-[var(--space-4)] py-[var(--space-3)]",
        "[[data-density=comfortable]_&]:h-11 [[data-density=compact]_&]:h-9 [[data-density=dense]_&]:h-7",
        numeric && "text-right tabular-nums",
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
}

export function TableFooterRow({ className, children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-t-2 border-[var(--color-border)] bg-[var(--color-surface-sunken)] font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function useSortableTable<T>(data: T[], defaultSort?: { key: keyof T; direction: SortDirection }) {
  const [sortKey, setSortKey] = useState<keyof T | null>(defaultSort?.key ?? null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSort?.direction ?? null);

  const handleSort = useCallback(
    (key: keyof T) => {
      if (sortKey === key) {
        setSortDirection((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
        if (sortDirection === "desc") setSortKey(null);
      } else {
        setSortKey(key);
        setSortDirection("asc");
      }
    },
    [sortKey, sortDirection],
  );

  const sorted = useMemo(
    () =>
      [...data].sort((a, b) => {
        if (!sortKey || !sortDirection) return 0;
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }),
    [data, sortKey, sortDirection],
  );

  return {
    data: sorted,
    sortKey,
    sortDirection,
    getSortProps: (key: keyof T) => ({
      sortDirection: sortKey === key ? sortDirection : (null as SortDirection),
      onSort: () => handleSort(key),
    }),
  };
}
