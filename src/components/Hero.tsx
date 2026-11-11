import type { Profile } from "@/lib/content/schemas";
import { ExternalLink } from "./ExternalLink";

const secondary =
  "rounded-lg border border-night-700 px-4 py-2.5 text-sm font-medium text-ink transition hover:border-neon-violet hover:text-neon-violet";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      aria-labelledby="hero-name"
      className="snap-section flex flex-col items-start justify-center py-16"
    >
      {profile.availability && (
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-xs text-neon-cyan">
          <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-neon-cyan" />
          {profile.availability}
        </p>
      )}

      <h1
        id="hero-name"
        className="font-display text-5xl font-bold tracking-tight text-ink sm:text-7xl"
      >
        {profile.name}
      </h1>
      <p className="mt-3 font-mono text-lg text-neon-cyan glow-cyan sm:text-xl">{profile.title}</p>

      <p className="mt-8 max-w-2xl font-display text-2xl leading-snug text-ink sm:text-3xl">
        {profile.tagline}
      </p>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{profile.summary}</p>
      <p className="mt-4 font-mono text-sm text-ink-muted">
        <span aria-hidden="true">◉ </span>
        {profile.location}
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="rounded-lg bg-neon-cyan px-4 py-2.5 text-sm font-semibold text-night-950 shadow-[0_0_24px_-4px] shadow-neon-cyan/60 transition hover:bg-ink"
        >
          View projects
        </a>
        <a href={profile.resumeUrl} download className={secondary}>
          Résumé
        </a>
        <ExternalLink href={profile.githubUrl} className={secondary}>
          GitHub
        </ExternalLink>
        <ExternalLink href={profile.linkedinUrl} className={secondary}>
          LinkedIn
        </ExternalLink>
      </div>
    </section>
  );
}
