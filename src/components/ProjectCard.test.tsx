import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildContent } from "@/test/fixtures";
import { ProjectCard } from "./ProjectCard";

const [second, first] = buildContent().projects;

describe("ProjectCard", () => {
  it("renders the project as a titled article", () => {
    render(<ProjectCard project={second} />);

    const card = screen.getByRole("article", { name: "Second" });
    expect(within(card).getByRole("heading", { level: 3 })).toHaveTextContent("Second");
  });

  it("shows tagline, summary, highlight, role, and dates", () => {
    render(<ProjectCard project={second} />);

    expect(screen.getByText("Second tagline")).toBeInTheDocument();
    expect(screen.getByText("Second summary")).toBeInTheDocument();
    expect(screen.getByText("Second highlight")).toBeInTheDocument();
    expect(screen.getByText(/Frontend Developer/)).toBeInTheDocument();
    expect(screen.getByText("Jan 2024 – Jun 2024")).toBeInTheDocument();
  });

  it("describes team size, calling a team of one 'Solo'", () => {
    const { rerender } = render(<ProjectCard project={second} />);
    expect(screen.getByText("Team of 3")).toBeInTheDocument();

    rerender(<ProjectCard project={first} />);
    // Exact match: the role "Solo Developer" must not satisfy this.
    expect(screen.getByText("Solo")).toBeInTheDocument();
  });

  it("labels the project status", () => {
    const { rerender } = render(<ProjectCard project={second} />);
    expect(screen.getByText("Shipped")).toBeInTheDocument();

    rerender(<ProjectCard project={first} />);
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  it("lists every technology", () => {
    render(<ProjectCard project={first} />);

    const list = screen.getByRole("list", { name: /tech stack/i });
    expect(within(list).getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "TypeScript",
      "Next.js",
    ]);
  });

  it("shows a screenshot with descriptive alt text", () => {
    render(<ProjectCard project={second} />);

    expect(screen.getByRole("img", { name: "Second screenshot" })).toBeInTheDocument();
  });

  it("only renders links that exist, named for the project", () => {
    const { rerender } = render(<ProjectCard project={second} />);
    expect(screen.getByRole("link", { name: "Second live site" })).toHaveAttribute(
      "href",
      "https://second.example.com",
    );
    expect(screen.queryByRole("link", { name: /source code/i })).not.toBeInTheDocument();

    rerender(<ProjectCard project={first} />);
    expect(screen.getByRole("link", { name: "First source code" })).toHaveAttribute(
      "href",
      "https://github.com/test/first",
    );
    expect(screen.queryByRole("link", { name: /live site/i })).not.toBeInTheDocument();
  });
});
