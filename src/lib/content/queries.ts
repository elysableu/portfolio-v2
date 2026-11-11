import { asc, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { education, experience, profile, projects, skillGroups, skills } from "@/db/schema";
import type { Database } from "@/db/types";
import {
  educationSchema,
  experienceSchema,
  profileSchema,
  projectSchema,
  skillGroupSchema,
  type Education,
  type Experience,
  type Profile,
  type Project,
  type SkillGroup,
} from "./schemas";

/** Raised when content is missing or fails validation. */
export class ContentError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "ContentError";
  }
}

function validate<T>(schema: z.ZodType<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ContentError(`Invalid ${label}: ${z.prettifyError(result.error)}`, {
      cause: result.error,
    });
  }
  return result.data;
}

export async function getProfile(db: Database): Promise<Profile> {
  const [row] = await db.select().from(profile).limit(1);
  if (!row) throw new ContentError("Profile not found");
  return validate(profileSchema, row, "profile");
}

export async function getFeaturedProjects(db: Database): Promise<Project[]> {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.featured, true))
    .orderBy(asc(projects.sortOrder), asc(projects.id));
  return validate(z.array(projectSchema), rows, "projects");
}

export async function getExperience(db: Database): Promise<Experience[]> {
  const rows = await db
    .select()
    .from(experience)
    // Current roles (no end date) first, then by most recent end date.
    .orderBy(sql`${experience.endDate} desc nulls first`, desc(experience.startDate));
  return validate(z.array(experienceSchema), rows, "experience");
}

export async function getEducation(db: Database): Promise<Education[]> {
  const rows = await db.select().from(education).orderBy(desc(education.endDate));
  return validate(z.array(educationSchema), rows, "education");
}

export async function getSkillGroups(db: Database): Promise<SkillGroup[]> {
  const rows = await db
    .select({ group: skillGroups.name, skill: skills.name })
    .from(skillGroups)
    .innerJoin(skills, eq(skills.groupId, skillGroups.id))
    .orderBy(asc(skillGroups.sortOrder), asc(skills.sortOrder));

  // Rows arrive grouped thanks to the ORDER BY; fold them into nested lists.
  // The inner join naturally drops groups without skills.
  const groups = new Map<string, string[]>();
  for (const { group, skill } of rows) {
    groups.set(group, [...(groups.get(group) ?? []), skill]);
  }
  const result = [...groups].map(([name, list]) => ({ name, skills: list }));
  return validate(z.array(skillGroupSchema), result, "skill groups");
}
