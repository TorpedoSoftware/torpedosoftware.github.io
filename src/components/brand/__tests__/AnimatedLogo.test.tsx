import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnimatedLogo } from "../AnimatedLogo";

describe("AnimatedLogo", () => {
  it("exposes an accessible name from the label prop", () => {
    render(<AnimatedLogo label="Torpedo Software" />);
    expect(screen.getByAltText("Torpedo Software")).toBeInTheDocument();
  });

  it("renders all four logo pieces", () => {
    const { container } = render(<AnimatedLogo />);
    const sources = Array.from(container.querySelectorAll("img")).map((img) => img.getAttribute("src"));
    expect(sources).toEqual([
      "/brand/logo-pieces/purple.png",
      "/brand/logo-pieces/prop.png",
      "/brand/logo-pieces/body.png",
      "/brand/logo-pieces/ring.png",
    ]);
  });

  it("applies the passed className to the container", () => {
    const { container } = render(<AnimatedLogo className="w-40" />);
    expect(container.firstChild).toHaveClass("w-40", "rounded-full", "overflow-hidden");
  });
});
