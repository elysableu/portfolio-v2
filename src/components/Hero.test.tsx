import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildContent } from "@/test/fixtures";
import { Hero } from "./Hero";

const { profile } = buildContent();

describe("Hero", () => {
  it("leads with the name as the page's only h1", () => {
    render(<Hero profile={profile} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Test Person");
  });

  it("shows title, tagline, summary, and location", () => {
    render(<Hero profile={profile} />);

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Builds things")).toBeInTheDocument();
    expect(screen.getByText("A short summary.")).toBeInTheDocument();
    expect(screen.getByText(/Boulder, CO/)).toBeInTheDocument();
  });

  it("shows availability when set and hides it when null", () => {
    const { rerender } = render(<Hero profile={profile} />);
    expect(screen.getByText("Open to roles")).toBeInTheDocument();

    rerender(<Hero profile={{ ...profile, availability: null }} />);
    expect(screen.queryByText("Open to roles")).not.toBeInTheDocument();
  });

  it("links to projects, résumé, GitHub, and LinkedIn", () => {
    render(<Hero profile={profile} />);

    expect(screen.getByRole("link", { name: /view projects/i })).toHaveAttribute(
      "href",
      "#projects",
    );
    expect(screen.getByRole("link", { name: /résumé/i })).toHaveAttribute(
      "href",
      "/documents/resume.pdf",
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/test",
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/test",
    );
  });

  it("opens external profiles in a new tab safely", () => {
    render(<Hero profile={profile} />);

    const github = screen.getByRole("link", { name: /github/i });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
