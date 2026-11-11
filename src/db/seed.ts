import { siteContentSchema, type SiteContent } from "@/lib/content/schemas";
import { education, experience, profile, projects, skillGroups, skills } from "./schema";
import type { Database } from "./types";

/**
 * Replaces all site content in a single transaction.
 * Content is validated first, so invalid input never touches the database.
 */
export async function seedContent(db: Database, input: SiteContent): Promise<void> {
  const content = siteContentSchema.parse(input);

  await db.transaction(async (tx) => {
    // Order matters: skills reference skill_groups.
    await tx.delete(skills);
    await tx.delete(skillGroups);
    await tx.delete(projects);
    await tx.delete(experience);
    await tx.delete(education);
    await tx.delete(profile);

    await tx.insert(profile).values(content.profile);
    if (content.projects.length) await tx.insert(projects).values(content.projects);
    if (content.experience.length) await tx.insert(experience).values(content.experience);
    if (content.education.length) await tx.insert(education).values(content.education);

    for (const group of content.skillGroups) {
      const [{ id }] = await tx
        .insert(skillGroups)
        .values({ name: group.name, sortOrder: group.sortOrder })
        .returning({ id: skillGroups.id });
      if (group.skills.length) {
        await tx
          .insert(skills)
          .values(group.skills.map((name, i) => ({ groupId: id, name, sortOrder: i })));
      }
    }
  });
}
