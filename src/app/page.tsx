import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SiteHeader } from "@/components/SiteHeader";
import { Skills } from "@/components/Skills";
import { getPageContent } from "@/lib/content";

export default async function Home() {
  const { profile, projects, experience, education, skillGroups } = await getPageContent();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-neon-cyan focus:px-3 focus:py-2 focus:text-night-950"
      >
        Skip to content
      </a>
      <div id="top" />
      <SiteHeader name={profile.name} />
      <main id="main" className="mx-auto max-w-5xl px-4 sm:px-6">
        <Hero profile={profile} />
        <Projects projects={projects} />
        <Experience experience={experience} education={education} />
        <Skills groups={skillGroups} />
        <Contact profile={profile} />
      </main>
      <footer className="snap-end mx-auto max-w-5xl px-4 py-10 font-mono text-xs text-ink-muted sm:px-6">
        Built with Next.js, TypeScript, Tailwind, Drizzle &amp; Neon. Test-driven with Vitest and
        Playwright.
      </footer>
    </>
  );
}
