import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary, TooltipProvider } from "@/components/primitives";

export function SiteLayout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // React-router doesn't scroll to a hash on navigation, so do it manually.
  // Without this, following an anchor link to a section lands at the top of
  // the page instead of the target section.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // Element may not exist yet if the page is lazy-loaded. Watch for it.
      let timeout: ReturnType<typeof setTimeout>;
      const observer = new MutationObserver(() => {
        const target = document.getElementById(id);
        if (target) {
          clearTimeout(timeout);
          observer.disconnect();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      timeout = setTimeout(() => observer.disconnect(), 3000);
      return () => {
        clearTimeout(timeout);
        observer.disconnect();
      };
    }
    mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return (
    <TooltipProvider>
      <div className="flex h-dvh flex-col bg-canvas">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-[var(--space-4)] focus-visible:top-[var(--space-4)] focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-surface focus-visible:px-[var(--space-4)] focus-visible:py-[var(--space-2)] focus-visible:text-body focus-visible:text-text-primary focus-visible:shadow-2 focus-visible:shadow-focus"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main
          ref={mainRef}
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-x-hidden overflow-y-auto overscroll-none focus:outline-none"
        >
          <ErrorBoundary resetKeys={[location.pathname]}>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
