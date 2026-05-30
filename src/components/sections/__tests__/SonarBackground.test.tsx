import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { SonarBackground } from "../SonarBackground";

// The sweep beam is baked from a canvas conic gradient, which jsdom doesn't
// implement. Stub the 2D context so the beam's progressive-enhancement path runs
// in tests; without this the beam is intentionally absent (as on unsupported
// browsers), which is covered by the "omits the beam" test below.
function mockCanvas() {
  const gradient = { addColorStop: vi.fn() };
  const ctx = {
    createConicGradient: vi.fn(() => gradient),
    createRadialGradient: vi.fn(() => gradient),
    fillRect: vi.fn(),
    fillStyle: "",
    globalCompositeOperation: "",
  };
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    ctx as unknown as CanvasRenderingContext2D,
  );
  vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue("data:image/png;base64,stub");
}

describe("SonarBackground", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("is decorative: hidden from assistive tech and non-interactive", () => {
    const { container } = render(<SonarBackground />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute("aria-hidden");
    expect(root).toHaveClass("pointer-events-none");
  });

  it("renders the desktop-only sweep beam when canvas conic gradients are available", () => {
    mockCanvas();
    const { container } = render(<SonarBackground />);
    const beam = container.querySelector(".animate-sonar-sweep");
    expect(beam).toBeInTheDocument();
    // Beam is gated to md+ to spare mobile GPUs the per-frame fill.
    expect(beam).toHaveClass("hidden", "md:block");
  });

  it("omits the beam when canvas conic gradients are unavailable", () => {
    // jsdom has no canvas support, so renderBeamTexture returns null here.
    const { container } = render(<SonarBackground />);
    expect(container.querySelector(".animate-sonar-sweep")).not.toBeInTheDocument();
  });

  it("renders six pings", () => {
    const { container } = render(<SonarBackground />);
    expect(container.querySelectorAll(".animate-sonar-ping")).toHaveLength(6);
  });
});
