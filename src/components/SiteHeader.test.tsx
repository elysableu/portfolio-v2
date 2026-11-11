import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("links the name back to the top of the page", () => {
    render(<SiteHeader name="Test Person" />);

    expect(screen.getByRole("link", { name: /test person/i })).toHaveAttribute("href", "#top");
  });

  it("has primary navigation to every section", () => {
    render(<SiteHeader name="Test Person" />);

    const nav = screen.getByRole("navigation", { name: /primary/i });
    expect(
      within(nav)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(["#projects", "#experience", "#skills", "#contact"]);
  });

  it("toggles the mobile menu and reflects state with aria-expanded", async () => {
    const user = userEvent.setup();
    render(<SiteHeader name="Test Person" />);
    const toggle = screen.getByRole("button", { name: /menu/i });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu after a link is chosen", async () => {
    const user = userEvent.setup();
    render(<SiteHeader name="Test Person" />);
    const toggle = screen.getByRole("button", { name: /menu/i });

    await user.click(toggle);
    await user.click(screen.getByRole("link", { name: "Skills" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu on Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader name="Test Person" />);
    const toggle = screen.getByRole("button", { name: /menu/i });

    await user.click(toggle);
    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
