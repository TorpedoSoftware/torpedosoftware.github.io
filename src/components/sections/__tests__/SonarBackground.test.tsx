import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SonarBackground } from "../SonarBackground";

describe("SonarBackground", () => {
  it("is decorative: hidden from assistive tech and non-interactive", () => {
    const { container } = render(<SonarBackground />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute("aria-hidden");
    expect(root).toHaveClass("pointer-events-none");
  });

  it("renders the animated sweep beam", () => {
    const { container } = render(<SonarBackground />);
    expect(container.querySelector(".animate-sonar-sweep")).toBeInTheDocument();
  });

  it("renders six pings", () => {
    const { container } = render(<SonarBackground />);
    expect(container.querySelectorAll(".animate-sonar-ping")).toHaveLength(6);
  });
});
