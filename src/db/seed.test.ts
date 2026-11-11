import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { siteContentSchema } from "@/lib/content/schemas";
import { createTestDb } from "@/test/db";
import { buildContent } from "@/test/fixtures";
import { siteContent } from "./content";
import { profile, projects, skillGroups, skills } from "./schema";
import { seedContent } from "./seed";
import type { Database } from "./types";

let db: Database;
let close: () => Promise<void>;

beforeEach(async () => {
  ({ db, close } = await createTestDb());
});

afterEach(async () => {
  await close();
});

describe("seedContent", () => {
  it("writes every content table", async () => {
    await seedContent(db, buildContent());

    expect(await db.select().from(profile)).toHaveLength(1);
    expect(await db.select().from(projects)).toHaveLength(3);
    expect(await db.select().from(skillGroups)).toHaveLength(3);
    expect(await db.select().from(skills)).toHaveLength(4);
  });

  it("is idempotent: re-seeding replaces rather than duplicates", async () => {
    await seedContent(db, buildContent());
    await seedContent(db, buildContent());

    expect(await db.select().from(profile)).toHaveLength(1);
    expect(await db.select().from(projects)).toHaveLength(3);
    expect(await db.select().from(skills)).toHaveLength(4);
  });

  it("accepts empty sections, clearing out previous rows", async () => {
    await seedContent(db, buildContent());
    await seedContent(db, buildContent({ projects: [], experience: [], education: [] }));

    expect(await db.select().from(projects)).toHaveLength(0);
    expect(await db.select().from(profile)).toHaveLength(1);
  });

  it("validates before writing and leaves existing data untouched", async () => {
    await seedContent(db, buildContent());
    const bad = buildContent();
    bad.profile.email = "not-an-email";

    await expect(seedContent(db, bad)).rejects.toThrow();

    const [row] = await db.select().from(profile);
    expect(row.email).toBe("test@example.com");
  });
});

describe("siteContent (the real seed data)", () => {
  it("passes validation", () => {
    expect(() => siteContentSchema.parse(siteContent)).not.toThrow();
  });

  it("features four projects with unique slugs", () => {
    const featured = siteContent.projects.filter((p) => p.featured);
    const slugs = new Set(siteContent.projects.map((p) => p.slug));

    expect(featured).toHaveLength(4);
    expect(slugs.size).toBe(siteContent.projects.length);
  });
});
