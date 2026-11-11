import { describe, expect, it } from "vitest";
import { formatDateRange, formatMonthYear, formatStatus } from "./format";

describe("formatMonthYear", () => {
  it("formats an ISO date as short month and year", () => {
    expect(formatMonthYear("2025-04-01")).toBe("Apr 2025");
  });

  it("is not shifted by time zones", () => {
    // A naive `new Date("2025-01-01")` renders as Dec 2024 west of UTC.
    expect(formatMonthYear("2025-01-01")).toBe("Jan 2025");
  });
});

describe("formatDateRange", () => {
  it("joins start and end with an en dash", () => {
    expect(formatDateRange("2024-08-01", "2025-06-01")).toBe(
      "Aug 2024 – Jun 2025",
    );
  });

  it("uses Present when there is no end date", () => {
    expect(formatDateRange("2025-11-01", null)).toBe("Nov 2025 – Present");
  });

  it("collapses a range within a single month", () => {
    expect(formatDateRange("2025-04-01", "2025-04-30")).toBe("Apr 2025");
  });
});

describe("formatStatus", () => {
  it.each([
    ["completed", "Shipped"],
    ["in_progress", "In progress"],
    ["on_hold", "On hold"],
  ] as const)("labels %s as %s", (status, label) => {
    expect(formatStatus(status)).toBe(label);
  });
});
