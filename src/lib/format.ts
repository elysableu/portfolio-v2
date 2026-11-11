import type { ProjectStatus } from "./content/schemas";

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC", // ISO dates are UTC midnight; avoid shifting a month back
});

export function formatMonthYear(isoDate: string): string {
  return monthYear.format(new Date(`${isoDate}T00:00:00Z`));
}

export function formatDateRange(start: string, end: string | null): string {
  const from = formatMonthYear(start);
  if (end === null) return `${from} – Present`;
  const to = formatMonthYear(end);
  return from === to ? from : `${from} – ${to}`;
}

const statusLabels: Record<ProjectStatus, string> = {
  completed: "Shipped",
  in_progress: "In progress",
  on_hold: "On hold",
};

export function formatStatus(status: ProjectStatus): string {
  return statusLabels[status];
}
