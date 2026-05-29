import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/primitives/Tooltip";
import { ToastProvider } from "@/components/primitives/Toast";
import { HomePage } from "../HomePage";
import { NotFoundPage } from "../NotFoundPage";

function renderWithRouter(initialPath: string, ui: React.ReactNode) {
  return render(
    <ToastProvider>
      <TooltipProvider>
        <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
      </TooltipProvider>
    </ToastProvider>,
  );
}

describe("Router integration", () => {
  it("renders HomePage at /", () => {
    renderWithRouter(
      "/",
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>,
    );
    expect(screen.getByRole("img", { name: /torpedo software/i })).toBeInTheDocument();
  });

  it("renders NotFoundPage for unknown routes", () => {
    renderWithRouter(
      "/does-not-exist",
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>,
    );
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
