import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildContent } from "@/test/fixtures";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Projects } from "./Projects";
import { Skills } from "./Skills";

const content = buildContent();

describe("Projects", () => {
  it("is a labelled landmark anchored at #projects", () => {
    render(<Projects projects={content.projects} />);

    const region = screen.getByRole("region", { name: /projects/i });
    expect(region).toHaveAttribute("id", "projects");
  });

  it("renders one card per project, in the given order", () => {
    render(<Projects projects={content.projects} />);

    expect(screen.getAllByRole("article").map((a) => a.getAttribute("aria-label"))).toEqual([
      "Second",
      "First",
      "Hidden",
    ]);
  });

  it("shows an empty state when there are no projects", () => {
    render(<Projects projects={[]} />);

    expect(screen.getByText(/projects are on the way/i)).toBeInTheDocument();
  });
});

describe("Experience", () => {
  it("is a labelled landmark anchored at #experience", () => {
    render(<Experience experience={content.experience} education={content.education} />);

    expect(screen.getByRole("region", { name: /experience/i })).toHaveAttribute(
      "id",
      "experience",
    );
  });

  it("lists roles with organization, dates, and highlights", () => {
    render(<Experience experience={content.experience} education={content.education} />);

    const work = screen.getByRole("list", { name: /work/i });
    const [past] = within(work)
      .getAllByRole("listitem")
      .filter((li) => li.textContent?.includes("Past Role"));
    expect(past).toHaveTextContent("Old Co");
    expect(past).toHaveTextContent("Aug 2017 – Dec 2019");
    expect(past).toHaveTextContent("Did a thing");
  });

  it("lists education with credential, institution, and details", () => {
    render(<Experience experience={content.experience} education={content.education} />);

    const schools = screen.getByRole("list", { name: /education/i });
    expect(schools).toHaveTextContent("BA Mathematics");
    expect(schools).toHaveTextContent("State University");
    expect(schools).toHaveTextContent("Minor in Computer Science");
  });
});

describe("Skills", () => {
  it("renders each group as a labelled list of skills", () => {
    render(<Skills groups={[{ name: "Languages", skills: ["TypeScript", "Ruby"] }]} />);

    expect(screen.getByRole("region", { name: /skills/i })).toHaveAttribute("id", "skills");
    const list = screen.getByRole("list", { name: "Languages" });
    expect(within(list).getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "TypeScript",
      "Ruby",
    ]);
  });
});

describe("Contact", () => {
  it("offers an email link and is anchored at #contact", () => {
    render(<Contact profile={content.profile} />);

    expect(screen.getByRole("region", { name: /contact/i })).toHaveAttribute("id", "contact");
    expect(screen.getByRole("link", { name: /test@example.com/i })).toHaveAttribute(
      "href",
      "mailto:test@example.com",
    );
  });
});
