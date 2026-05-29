import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextInput } from "../TextInput";

// A controlled wrapper that mirrors how editors use TextInput: it parses on
// every change and re-emits the parsed number as the value prop.
function NumericHarness({
  initial,
  onParsed,
  inputType = "number",
}: {
  initial: number;
  onParsed?: (n: number) => void;
  inputType?: "number" | "currency" | "percent";
}) {
  const [n, setN] = useState(initial);
  return (
    <TextInput
      inputType={inputType}
      value={String(n)}
      onChange={(e) => {
        const val = parseFloat(e.target.value.replace(/[^0-9.-]/g, ""));
        const next = isNaN(val) ? 0 : val;
        setN(next);
        onParsed?.(next);
      }}
      data-testid="num"
    />
  );
}

describe("TextInput numeric draft", () => {
  it("lets the user clear the field down to empty while focused", () => {
    render(<NumericHarness initial={5000} />);
    const input = screen.getByTestId("num") as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "" } });
    expect(input.value).toBe("");
  });

  it("preserves transient leading-zero strings while editing", () => {
    // User has 5000 and backspaces the leading 5: the field should show "000",
    // not snap back to "0" via the parent's String(parsed) round-trip.
    render(<NumericHarness initial={5000} />);
    const input = screen.getByTestId("num") as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "000" } });
    expect(input.value).toBe("000");
    fireEvent.change(input, { target: { value: "6000" } });
    expect(input.value).toBe("6000");
  });

  it("evaluates math expressions on blur and re-emits the result", () => {
    const parsed = vi.fn();
    render(<NumericHarness initial={0} onParsed={parsed} inputType="currency" />);
    const input = screen.getByTestId("num") as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "100*12" } });
    fireEvent.blur(input);
    expect(parsed).toHaveBeenLastCalledWith(1200);
    // After blur, the currency formatter renders the canonical value
    expect(input.value).toBe("1,200");
  });

  it("does not re-emit when the draft is already canonical", () => {
    const parsed = vi.fn();
    render(<NumericHarness initial={0} onParsed={parsed} />);
    const input = screen.getByTestId("num") as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "42" } });
    parsed.mockClear();
    fireEvent.blur(input);
    expect(parsed).not.toHaveBeenCalled();
  });

  it("commits the draft on Enter", () => {
    const parsed = vi.fn();
    render(<NumericHarness initial={0} onParsed={parsed} inputType="currency" />);
    const input = screen.getByTestId("num") as HTMLInputElement;
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "50+25" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(parsed).toHaveBeenLastCalledWith(75);
    expect(input.value).toBe("75");
    expect(document.activeElement).not.toBe(input);
  });

  it("formats currency with commas when not focused", () => {
    render(<NumericHarness initial={1234567} inputType="currency" />);
    const input = screen.getByTestId("num") as HTMLInputElement;
    expect(input.value).toBe("1,234,567");
  });

  it("strips formatting from the value when focusing currency", () => {
    render(<NumericHarness initial={1234567} inputType="currency" />);
    const input = screen.getByTestId("num") as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.value).toBe("1234567");
  });
});
