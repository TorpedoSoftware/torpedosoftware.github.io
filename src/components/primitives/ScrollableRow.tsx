import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface ScrollableRowProps {
  children: ReactNode;
  className?: string;
}

export function ScrollableRow({ children, className }: ScrollableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const wheelTarget = useRef(0);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    wheelTarget.current = el.scrollLeft;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      observer.disconnect();
    };
  }, [checkScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      if (!el || el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if ((e.deltaY < 0 && wheelTarget.current <= 0) || (e.deltaY > 0 && wheelTarget.current >= maxScroll))
        return;
      e.preventDefault();
      wheelTarget.current = Math.max(0, Math.min(wheelTarget.current + e.deltaY, maxScroll));
      el.scrollTo({ left: wheelTarget.current, behavior: "smooth" });
    }

    // passive: false is required to allow preventDefault() for vertical-to-horizontal
    // scroll redirection. The handler exits early when the container has no overflow,
    // limiting the performance cost to only when the carousel is scrollable.
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const d = dragState.current;
      if (!d.active) return;
      const el = scrollRef.current;
      if (!el) return;
      const dx = e.clientX - d.startX;
      if (Math.abs(dx) > 3) d.moved = true;
      el.scrollLeft = d.startScroll - dx;
    }

    function onMouseUp() {
      if (!dragState.current.active) return;
      dragState.current.active = false;
      setIsDragging(false);
      const el = scrollRef.current;
      if (el) wheelTarget.current = el.scrollLeft;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  function onMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    dragState.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    setIsDragging(true);
  }

  function onClickCapture(e: React.MouseEvent) {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  }

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.clientWidth * 0.7;
    const delta = direction === "left" ? -distance : distance;
    const maxScroll = el.scrollWidth - el.clientWidth;
    wheelTarget.current = Math.max(0, Math.min(el.scrollLeft + delta, maxScroll));
    el.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <div className={cn("relative", className)}>
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute -left-10 top-0 z-10 flex h-full items-center text-text-secondary transition-colors hover:text-text-primary"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onClickCapture={onClickCapture}
        className={cn(
          "scrollbar-hide flex gap-[var(--space-3)] overflow-x-auto select-none",
          canScrollLeft || canScrollRight ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "",
        )}
        style={{
          maskImage: `linear-gradient(to right, ${canScrollLeft ? "transparent 0%, black 2%" : "black 0%"}, ${canScrollRight ? "black 98%, transparent 100%" : "black 100%"})`,
          WebkitMaskImage: `linear-gradient(to right, ${canScrollLeft ? "transparent 0%, black 2%" : "black 0%"}, ${canScrollRight ? "black 98%, transparent 100%" : "black 100%"})`,
        }}
      >
        {children}
      </div>
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute -right-10 top-0 z-10 flex h-full items-center text-text-secondary transition-colors hover:text-text-primary"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}
