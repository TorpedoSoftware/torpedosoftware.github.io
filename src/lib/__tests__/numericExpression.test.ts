import { describe, it, expect } from "vitest";
import { evalNumericExpression } from "../numericExpression";

describe("evalNumericExpression", () => {
  it("parses plain integers and decimals", () => {
    expect(evalNumericExpression("0")).toBe(0);
    expect(evalNumericExpression("42")).toBe(42);
    expect(evalNumericExpression("3.14")).toBe(3.14);
    expect(evalNumericExpression(".5")).toBe(0.5);
  });

  it("evaluates basic arithmetic", () => {
    expect(evalNumericExpression("100*12")).toBe(1200);
    expect(evalNumericExpression("1000+500")).toBe(1500);
    expect(evalNumericExpression("2000-300")).toBe(1700);
    expect(evalNumericExpression("100/4")).toBe(25);
  });

  it("respects operator precedence and parentheses", () => {
    expect(evalNumericExpression("2+3*4")).toBe(14);
    expect(evalNumericExpression("(2+3)*4")).toBe(20);
    expect(evalNumericExpression("100*(1+0.05)")).toBe(105);
  });

  it("supports leading unary minus and plus", () => {
    expect(evalNumericExpression("-50")).toBe(-50);
    expect(evalNumericExpression("+50")).toBe(50);
    expect(evalNumericExpression("-(10+5)")).toBe(-15);
    expect(evalNumericExpression("10*-2")).toBe(-20);
  });

  it("strips whitespace, commas, $, and %", () => {
    expect(evalNumericExpression(" 5,000 ")).toBe(5000);
    expect(evalNumericExpression("$1,234.50")).toBe(1234.5);
    expect(evalNumericExpression("100% / 4")).toBe(25);
  });

  it("preserves transient leading-zero strings as their numeric value", () => {
    expect(evalNumericExpression("000")).toBe(0);
    expect(evalNumericExpression("06000")).toBe(6000);
  });

  it("returns null for empty or invalid input", () => {
    expect(evalNumericExpression("")).toBeNull();
    expect(evalNumericExpression("   ")).toBeNull();
    expect(evalNumericExpression("abc")).toBeNull();
    expect(evalNumericExpression("100*")).toBeNull();
    expect(evalNumericExpression("(1+2")).toBeNull();
    expect(evalNumericExpression("1++2")).toBe(3); // unary + on second operand is allowed
    expect(evalNumericExpression("1//2")).toBeNull();
  });

  it("returns null for division by zero or non-finite results", () => {
    expect(evalNumericExpression("1/0")).toBeNull();
    expect(evalNumericExpression("(5-5)/0")).toBeNull();
  });

  it("rejects identifiers and unsupported characters", () => {
    expect(evalNumericExpression("alert(1)")).toBeNull();
    expect(evalNumericExpression("1; alert(1)")).toBeNull();
    expect(evalNumericExpression("Math.PI")).toBeNull();
  });
});
