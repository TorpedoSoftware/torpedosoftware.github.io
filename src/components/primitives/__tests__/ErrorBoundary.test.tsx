import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorBoundary } from "../ErrorBoundary";

function ThrowingChild({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error("Test error");
  return <p>All good</p>;
}

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>Hello</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders default fallback when a child throws", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("calls onError when a child throws", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <ThrowingChild shouldThrow />
      </ErrorBoundary>,
    );
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) }),
    );
    vi.restoreAllMocks();
  });

  it("resets when the Try again button is clicked", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    let shouldThrow = true;
    function Child() {
      if (shouldThrow) throw new Error("Boom");
      return <p>Recovered</p>;
    }

    const { rerender } = render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    shouldThrow = false;
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    rerender(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Recovered")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("renders custom fallback when provided", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={(err) => <p>Custom: {err.message}</p>}>
        <ThrowingChild shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Custom: Test error")).toBeInTheDocument();
    vi.restoreAllMocks();
  });

  it("resets when resetKeys change", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    let shouldThrow = true;
    function Child() {
      if (shouldThrow) throw new Error("Boom");
      return <p>Reset worked</p>;
    }

    const { rerender } = render(
      <ErrorBoundary resetKeys={["a"]}>
        <Child />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    shouldThrow = false;
    rerender(
      <ErrorBoundary resetKeys={["b"]}>
        <Child />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Reset worked")).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
