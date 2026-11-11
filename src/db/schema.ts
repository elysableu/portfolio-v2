import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const projectStatus = pgEnum("project_status", [
  "completed",
  "in_progress",
  "on_hold",
]);

/** Single-row table holding the site owner's headline details. */
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  summary: text("summary").notNull(),
  location: text("location").notNull(),
  availability: text("availability"),
  email: text("email").notNull(),
  githubUrl: text("github_url").notNull(),
  linkedinUrl: text("linkedin_url").notNull(),
  resumeUrl: text("resume_url").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  summary: text("summary").notNull(),
  highlight: text("highlight").notNull(),
  role: text("role").notNull(),
  teamSize: integer("team_size").notNull().default(1),
  status: projectStatus("status").notNull(),
  startDate: date("start_date", { mode: "string" }).notNull(),
  endDate: date("end_date", { mode: "string" }),
  tech: text("tech").array().notNull().default([]),
  imageUrl: text("image_url").notNull(),
  imageAlt: text("image_alt").notNull(),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  organization: text("organization").notNull(),
  location: text("location").notNull(),
  startDate: date("start_date", { mode: "string" }).notNull(),
  endDate: date("end_date", { mode: "string" }),
  summary: text("summary").notNull(),
  highlights: text("highlights").array().notNull().default([]),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  credential: text("credential").notNull(),
  institution: text("institution").notNull(),
  location: text("location").notNull(),
  startDate: date("start_date", { mode: "string" }).notNull(),
  endDate: date("end_date", { mode: "string" }).notNull(),
  details: text("details"),
});

export const skillGroups = pgTable("skill_groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id")
    .notNull()
    .references(() => skillGroups.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});
