import type { Profile } from "@/lib/content/schemas";
import { SectionHeading } from "./SectionHeading";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="snap-section flex flex-col justify-center py-16">
      <SectionHeading id="contact-title" index={4} title="Contact" />
      <div className="neon-card mt-10 p-8 text-center sm:p-12">
        <p className="font-display text-2xl font-semibold sm:text-3xl">
          Let&apos;s build something <span className="text-neon-pink glow-pink">worth using</span>.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-ink-muted">
          I&apos;m happy to talk about roles, projects, or anything on this page.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block break-all font-mono text-lg text-neon-cyan underline decoration-neon-cyan/40 underline-offset-8 glow-cyan transition hover:decoration-neon-cyan"
        >
          {profile.email}
        </a>
      </div>
    </section>
  );
}
