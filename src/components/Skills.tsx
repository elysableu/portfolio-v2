import type { SkillGroup } from "@/lib/content/schemas";
import { SectionHeading } from "./SectionHeading";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="snap-section flex flex-col justify-center py-16">
      <SectionHeading id="skills-title" index={3} title="Skills" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.name} className="neon-card p-6">
            <h3 className="font-mono text-sm uppercase tracking-widest text-neon-cyan">
              {group.name}
            </h3>
            <ul aria-label={group.name} className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-night-700 bg-night-800 px-2.5 py-1 text-sm text-ink"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
