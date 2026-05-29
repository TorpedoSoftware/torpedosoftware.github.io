import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnimatedWordmark } from "../AnimatedWordmark";

describe("AnimatedWordmark", () => {
  it("exposes a single accessible name from the emblem", () => {
    render(<AnimatedWordmark label="Torpedo Software" />);
    // The lettering is decorative, so the only accessible name comes from the emblem.
    expect(screen.getByAltText("Torpedo Software")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it("renders the TORPEDO and SOFTWARE lettering as decorative masks", () => {
    const { container } = render(<AnimatedWordmark />);
    expect(container.querySelector(".mask-torpedo")).toBeInTheDocument();
    expect(container.querySelector(".mask-software")).toBeInTheDocument();
  });

  it("applies the passed className to the row", () => {
    const { container } = render(<AnimatedWordmark className="w-[820px]" />);
    expect(container.firstChild).toHaveClass("w-[820px]", "flex", "items-center");
  });
});
