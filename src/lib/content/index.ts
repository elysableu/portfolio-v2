import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getDb } from "@/db/client";
import { CONTENT_TAG } from "@/lib/revalidate";
import * as queries from "./queries";

/**
 * Cached content for the page. Results are prerendered into the static
 * shell and refreshed daily, or immediately when `npm run db:seed` calls
 * POST /api/revalidate.
 */
export async function getPageContent() {
  "use cache";
  cacheLife("days");
  cacheTag(CONTENT_TAG);

  const db = getDb();
  const [profile, projects, experience, education, skillGroups] = await Promise.all([
    queries.getProfile(db),
    queries.getFeaturedProjects(db),
    queries.getExperience(db),
    queries.getEducation(db),
    queries.getSkillGroups(db),
  ]);
  return { profile, projects, experience, education, skillGroups };
}
