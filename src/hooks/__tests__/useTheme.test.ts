import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { renderHook, act } from "@testing-library/react";

let useTheme: typeof import("../useTheme").useTheme;

describe("useTheme", () => {
  beforeAll(async () => {
    const mod = await import("../useTheme");
    useTheme = mod.useTheme;
  });

  beforeEach(() => {
    document.documentElement.dataset.theme = "dark";
    localStorage.clear();
  });

  it("returns the current theme from the DOM attribute", () => {
    document.documentElement.dataset.theme = "light";
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });

  it("defaults to dark when no attribute is set", () => {
    delete document.documentElement.dataset.theme;
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
  });

  it("setTheme updates the DOM and localStorage", () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setTheme("light"));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("bb-theme")).toBe("light");
  });

  it("toggle switches between light and dark", async () => {
    document.documentElement.dataset.theme = "dark";
    const { result, rerender } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    // MutationObserver is async, rerender to pick up the new snapshot
    rerender();
    expect(result.current.theme).toBe("light");
    act(() => result.current.toggle());
    rerender();
    expect(result.current.theme).toBe("dark");
  });
});
