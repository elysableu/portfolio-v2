import Image from "next/image";
import type { Project, ProjectStatus } from "@/lib/content/schemas";
import { formatDateRange, formatStatus } from "@/lib/format";
import { ExternalLink } from "./ExternalLink";

const statusStyles: Record<ProjectStatus, string> = {
  completed: "border-neon-cyan/40 text-neon-cyan",
  in_progress: "border-neon-violet/40 text-neon-violet",
  on_hold: "border-neon-amber/40 text-neon-amber",
};

const linkStyle =
  "font-mono text-sm text-ink underline decoration-night-700 underline-offset-4 transition hover:text-neon-cyan hover:decoration-neon-cyan";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article aria-label={project.title} className="neon-card group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-night-700">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top opacity-85 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-neon-pink">{project.tagline}</p>
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-xs ${statusStyles[project.status]}`}
          >
            {formatStatus(project.status)}
          </span>
        </div>

        <p className="mt-3 flex flex-wrap gap-x-2 font-mono text-xs text-ink-muted">
          <span>{project.role}</span>
          <span aria-hidden="true">·</span>
          <span>{project.teamSize === 1 ? "Solo" : `Team of ${project.teamSize}`}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDateRange(project.startDate, project.endDate)}</span>
        </p>

        <p className="mt-4 leading-relaxed text-ink">{project.summary}</p>
        <p className="mt-3 border-l-2 border-neon-violet/60 pl-3 text-sm leading-relaxed text-ink-muted">
          {project.highlight}
        </p>

        <ul aria-label="Tech stack" className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-night-800 px-2 py-1 font-mono text-xs text-ink-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-auto flex gap-5 pt-6">
            {project.liveUrl && (
              <ExternalLink
                href={project.liveUrl}
                aria-label={`${project.title} live site`}
                className={linkStyle}
              >
                Live site ↗
              </ExternalLink>
            )}
            {project.repoUrl && (
              <ExternalLink
                href={project.repoUrl}
                aria-label={`${project.title} source code`}
                className={linkStyle}
              >
                Source code ↗
              </ExternalLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
