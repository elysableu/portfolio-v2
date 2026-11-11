import type { Education, Experience as Role } from "@/lib/content/schemas";
import { formatDateRange } from "@/lib/format";
import { SectionHeading } from "./SectionHeading";

type Props = { experience: Role[]; education: Education[] };

const subheading = "font-mono text-sm uppercase tracking-widest text-neon-cyan";
const timeline = "mt-6 space-y-8 border-l border-night-700 pl-6";
const dot =
  "absolute -left-[29px] top-1.5 size-2.5 rounded-full border-2 border-night-950 bg-neon-violet shadow-[0_0_10px] shadow-neon-violet";

export function Experience({ experience, education }: Props) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="snap-section py-16">
      <SectionHeading id="experience-title" index={2} title="Experience" />

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <div>
          <h3 className={subheading}>Work</h3>
          <ul aria-label="Work" className={timeline}>
            {experience.map((role) => (
              <li key={`${role.organization}-${role.startDate}`} className="relative">
                <span aria-hidden="true" className={dot} />
                <p className="font-mono text-xs text-ink-muted">
                  {formatDateRange(role.startDate, role.endDate)}
                </p>
                <p className="mt-1 font-display text-lg font-semibold">{role.role}</p>
                <p className="text-sm text-neon-pink">{role.organization}</p>
                <p className="mt-2 text-ink-muted">{role.summary}</p>
                {role.highlights.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-muted marker:text-neon-violet">
                    {role.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={subheading}>Education</h3>
          <ul aria-label="Education" className={timeline}>
            {education.map((item) => (
              <li key={`${item.institution}-${item.endDate}`} className="relative">
                <span aria-hidden="true" className={dot} />
                <p className="font-mono text-xs text-ink-muted">
                  {formatDateRange(item.startDate, item.endDate)}
                </p>
                <p className="mt-1 font-display text-lg font-semibold">{item.credential}</p>
                <p className="text-sm text-neon-pink">{item.institution}</p>
                {item.details && <p className="mt-2 text-ink-muted">{item.details}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
