import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { projects } from "@/db/schema";
import { seedContent } from "@/db/seed";
import type { Database } from "@/db/types";
import { createTestDb } from "@/test/db";
import { buildContent } from "@/test/fixtures";
import {
  ContentError,
  getEducation,
  getExperience,
  getFeaturedProjects,
  getProfile,
  getSkillGroups,
} from "./queries";

let db: Database;
let close: () => Promise<void>;

beforeEach(async () => {
  ({ db, close } = await createTestDb());
});

afterEach(async () => {
  await close();
});

describe("getProfile", () => {
  it("returns the profile row", async () => {
    await seedContent(db, buildContent());

    const profile = await getProfile(db);

    expect(profile).toMatchObject({
      name: "Test Person",
      email: "test@example.com",
      availability: "Open to roles",
    });
  });

  it("throws a ContentError when no profile exists", async () => {
    await expect(getProfile(db)).rejects.toThrow(ContentError);
  });
});

describe("getFeaturedProjects", () => {
  it("returns only featured projects, ordered by sortOrder", async () => {
    await seedContent(db, buildContent());

    const result = await getFeaturedProjects(db);

    expect(result.map((p) => p.slug)).toEqual(["first", "second"]);
  });

  it("returns nullable links and tech arrays intact", async () => {
    await seedContent(db, buildContent());

    const [first] = await getFeaturedProjects(db);

    expect(first.liveUrl).toBeNull();
    expect(first.repoUrl).toBe("https://github.com/test/first");
    expect(first.tech).toEqual(["TypeScript", "Next.js"]);
    expect(first.status).toBe("in_progress");
  });

  it("returns an empty list when nothing is featured", async () => {
    expect(await getFeaturedProjects(db)).toEqual([]);
  });

  it("rejects rows that fail validation instead of rendering bad data", async () => {
    await seedContent(db, buildContent());
    // Simulate a bad manual edit made directly in the database.
    await db.update(projects).set({ liveUrl: "not a url" });

    await expect(getFeaturedProjects(db)).rejects.toThrow(ContentError);
  });
});

describe("getExperience", () => {
  it("lists current roles first, then most recent", async () => {
    await seedContent(db, buildContent());

    const result = await getExperience(db);

    expect(result.map((e) => e.role)).toEqual(["Current Role", "Past Role"]);
    expect(result[0].endDate).toBeNull();
    expect(result[1].highlights).toEqual(["Did a thing"]);
  });
});

describe("getEducation", () => {
  it("lists most recently completed first", async () => {
    await seedContent(db, buildContent());

    const result = await getEducation(db);

    expect(result.map((e) => e.institution)).toEqual([
      "Bootcamp",
      "State University",
    ]);
  });
});

describe("getSkillGroups", () => {
  it("returns groups in order with their skills nested in order", async () => {
    await seedContent(db, buildContent());

    const result = await getSkillGroups(db);

    expect(result).toEqual([
      { name: "Languages", skills: ["TypeScript", "Ruby"] },
      { name: "Tools", skills: ["Git", "Docker"] },
    ]);
  });

  it("omits groups that have no skills", async () => {
    await seedContent(db, buildContent());

    const names = (await getSkillGroups(db)).map((g) => g.name);

    expect(names).not.toContain("Empty");
  });
});
