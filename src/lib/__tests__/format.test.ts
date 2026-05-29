import { describe, it, expect } from "vitest";
import { formatDate } from "../format";

describe("formatDate", () => {
  it("formats a valid ISO date string", () => {
    expect(formatDate("2024-03-15")).toBe("March 15, 2024");
  });

  it("formats a full ISO datetime string", () => {
    expect(formatDate("2023-12-25T00:00:00Z")).toBe("December 25, 2023");
  });

  it("returns the original string for an invalid date", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });

  it("returns the original string for an empty string", () => {
    expect(formatDate("")).toBe("");
  });

  it("uses UTC timezone to avoid off-by-one day errors", () => {
    const result = formatDate("2024-01-01");
    expect(result).toBe("January 1, 2024");
  });
});
