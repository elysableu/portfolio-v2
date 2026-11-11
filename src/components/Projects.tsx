import type { Project } from "@/lib/content/schemas";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="snap-section py-16">
      <SectionHeading id="projects-title" index={1} title="Projects" />
      {projects.length === 0 ? (
        <p className="mt-8 text-ink-muted">New projects are on the way. Check back soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
