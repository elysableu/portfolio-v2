import { z } from "zod";

/** Accepts absolute http(s) URLs or site-relative paths like `/img/a.jpg`. */
const link = z.union([z.url({ protocol: /^https?$/ }), z.string().regex(/^\/\S+$/)]);
const isoDate = z.iso.date();

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  summary: z.string().min(1),
  location: z.string().min(1),
  availability: z.string().min(1).nullable(),
  email: z.email(),
  githubUrl: z.url(),
  linkedinUrl: z.url(),
  resumeUrl: link,
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  tagline: z.string().min(1),
  summary: z.string().min(1),
  highlight: z.string().min(1),
  role: z.string().min(1),
  teamSize: z.number().int().positive(),
  status: z.enum(["completed", "in_progress", "on_hold"]),
  startDate: isoDate,
  endDate: isoDate.nullable(),
  tech: z.array(z.string().min(1)),
  imageUrl: link,
  imageAlt: z.string().min(1),
  liveUrl: z.url().nullable(),
  repoUrl: z.url().nullable(),
  featured: z.boolean(),
  sortOrder: z.number().int(),
});

export const experienceSchema = z.object({
  role: z.string().min(1),
  organization: z.string().min(1),
  location: z.string().min(1),
  startDate: isoDate,
  endDate: isoDate.nullable(),
  summary: z.string().min(1),
  highlights: z.array(z.string().min(1)),
});

export const educationSchema = z.object({
  credential: z.string().min(1),
  institution: z.string().min(1),
  location: z.string().min(1),
  startDate: isoDate,
  endDate: isoDate,
  details: z.string().min(1).nullable(),
});

export const skillGroupSchema = z.object({
  name: z.string().min(1),
  skills: z.array(z.string().min(1)),
});

/** Shape of everything the seed script writes. */
export const siteContentSchema = z.object({
  profile: profileSchema,
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skillGroups: z.array(skillGroupSchema.extend({ sortOrder: z.number().int() })),
});

export type Profile = z.infer<typeof profileSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectStatus = Project["status"];
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type SiteContent = z.infer<typeof siteContentSchema>;
