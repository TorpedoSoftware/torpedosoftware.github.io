import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/globals.css";
import { Router } from "@/app/Router";
import { ToastProvider } from "@/components/primitives/Toast";
import { ErrorBoundary } from "@/components/primitives/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>,
);
