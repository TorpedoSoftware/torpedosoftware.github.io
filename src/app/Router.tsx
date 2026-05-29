import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteLayout } from "./SiteLayout";
import { HomePage } from "./HomePage";
import { NotFoundPage } from "./NotFoundPage";
import { Spinner } from "@/components/primitives/Progress/Spinner";

const DesignDemoPage = lazy(() =>
  import("./design-demo/DesignDemoPage").then((m) => ({ default: m.DesignDemoPage })),
);

function RouteSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center py-[var(--space-12)]">
          <Spinner size={24} />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/design-demo"
            element={
              <RouteSuspense>
                <DesignDemoPage />
              </RouteSuspense>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
