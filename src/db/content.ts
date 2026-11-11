import type { SiteContent } from "@/lib/content/schemas";

/**
 * Source content for `npm run db:seed`. The live site reads from Postgres;
 * edit here (or directly in the database) and re-seed to publish changes.
 */
export const siteContent: SiteContent = {
  profile: {
    name: "Elysa Ward",
    title: "Full-Stack Software Engineer",
    tagline: "I build clear, well-tested web apps that serve real communities.",
    summary:
      "Former math educator turned engineer. I work across React/Next.js and Ruby on Rails, lead with tests, and bring a teacher's knack for turning complex problems into simple experiences.",
    location: "Seattle, WA",
    availability: "Open to software engineering roles",
    email: "elysabward@outlook.com",
    githubUrl: "https://github.com/elysableu",
    linkedinUrl: "https://www.linkedin.com/in/elysa-ward",
    resumeUrl: "/documents/Elysa_Ward_Resume_2026.pdf",
  },

  projects: [
    {
      slug: "repradar",
      title: "RepRadar",
      tagline: "Civic engagement, simplified",
      summary:
        "Find your representatives by zip code and follow the latest executive orders, with AI-generated plain-language summaries.",
      highlight:
        "Built a Rails normalization layer (gateways, serializers, models) that unified inconsistent government APIs into one shape for the React client.",
      role: "Full-Stack Developer",
      teamSize: 6,
      status: "completed",
      startDate: "2025-04-01",
      endDate: "2025-05-01",
      tech: ["React", "Ruby on Rails", "PostgreSQL", "RSpec", "Cypress", "REST APIs"],
      imageUrl: "/img/projects/repradar.jpg",
      imageAlt: "RepRadar home page showing representative search",
      liveUrl: "https://frontend-9cax.onrender.com",
      repoUrl: "https://github.com/RedRadar-WT-Team",
      featured: true,
      sortOrder: 1,
    },
    {
      slug: "tracker",
      title: "Tracker",
      tagline: "A CRM for the job hunt",
      summary:
        "Manage contacts, companies, and applications in one pipeline, with relationship mapping and a progress dashboard.",
      highlight:
        "Shipped a lightweight rich-text editor and isolated its pointer events so it coexists with drag-and-drop, on a 39-person team with CI on every PR.",
      role: "Frontend Developer",
      teamSize: 39,
      status: "completed",
      startDate: "2024-08-01",
      endDate: "2025-06-01",
      tech: ["React", "TypeScript", "Tailwind CSS", "Cypress", "Ruby on Rails", "CircleCI"],
      imageUrl: "/img/projects/tracker.jpg",
      imageAlt: "Tracker landing page",
      liveUrl: "https://tracker-crm-fe-38f7cf1aaca5.herokuapp.com/",
      repoUrl: "https://github.com/turingschool/tracker-crm-fe",
      featured: true,
      sortOrder: 2,
    },
    {
      slug: "afterglow-arcade",
      title: "AfterGlow Arcade",
      tagline: "Where the arcade never closes",
      summary:
        "A 90s neon browser arcade with a growing game library and a planned email-driven request and contribution pipeline.",
      highlight:
        "Composed a reusable neon toggle by layering CSS transforms, and kept the visual system simple by applying KISS to background patterns.",
      role: "Solo Developer",
      teamSize: 1,
      status: "in_progress",
      startDate: "2026-05-01",
      endDate: null,
      tech: ["React", "JavaScript", "CSS Modules"],
      imageUrl: "/img/projects/agarcade.jpg",
      imageAlt: "AfterGlow Arcade neon landing page",
      liveUrl: null,
      repoUrl: "https://github.com/elysableu/after_glow",
      featured: true,
      sortOrder: 3,
    },
    {
      slug: "silverguild",
      title: "SilverGuild",
      tagline: "A D&D toolkit for new and veteran players",
      summary:
        "Guided character sheet creation and management, built as the foundation for dice rolling, maps, and a GM campaign mode.",
      highlight:
        "Mapped the user journey and data model before coding, then split the MVP into phased milestones to ship the Rails API first.",
      role: "Founder & Full-Stack Developer",
      teamSize: 2,
      status: "on_hold",
      startDate: "2024-04-01",
      endDate: null,
      tech: ["Next.js", "TypeScript", "Ruby on Rails", "PostgreSQL", "RSpec", "AWS"],
      imageUrl: "/img/projects/silverguild.jpg",
      imageAlt: "SilverGuild home page",
      liveUrl: null,
      repoUrl: "https://github.com/SilverGuild",
      featured: true,
      sortOrder: 4,
    },
  ],

  experience: [
    {
      role: "Sales Associate",
      organization: "LUCCA Great Finds",
      location: "Seattle, WA",
      startDate: "2026-10-01",
      endDate: null,
      summary:
        "Independent gift shop on historic Ballard Avenue since 2001, known for its Seattle-printed LUCCA Paperworks cards and one-of-a-kind finds from local makers.",
      highlights: [
        "Guide customers to beautiful, one-of-a-kind gifts matched to the person and occasion",
        "Handle checkout, restocking, and inventory across a densely merchandised floor",
        "Maintain the storefront and displays to keep the shop inviting",
      ],
    },
    {
      role: "Independent Tutor",
      organization: "Dragonfly Education",
      location: "Boulder, CO",
      startDate: "2025-11-01",
      endDate: "2026-08-01",
      summary: "One-on-one instruction in mathematics and computer science.",
      highlights: [
        "Run the full business: scheduling, planning, logistics, and tax compliance",
        "Diagnose learning gaps with families and educators and design targeted plans",
      ],
    },
    {
      role: "Student Teacher, Mathematics",
      organization: "Denver, Cherry Creek & Jefferson County Public Schools",
      location: "Denver, CO",
      startDate: "2017-08-01",
      endDate: "2019-12-01",
      summary: "Placements across three districts, teaching secondary mathematics.",
      highlights: [
        "Delivered 50+ technical lessons to diverse learners",
        "Used performance data to run targeted interventions for 20+ students",
      ],
    },
  ],

  education: [
    {
      credential: "Software Engineering Certificate (Full-Stack)",
      institution: "Turing School of Software & Design",
      location: "Denver, CO",
      startDate: "2024-10-01",
      endDate: "2025-05-01",
      details: "Accredited program; TDD, pair programming, agile teams",
    },
    {
      credential: "B.A. Mathematics",
      institution: "Metropolitan State University of Denver",
      location: "Denver, CO",
      startDate: "2012-08-01",
      endDate: "2022-12-01",
      details: "Minor in Computer Science",
    },
  ],

  skillGroups: [
    {
      name: "Languages & Frameworks",
      sortOrder: 1,
      skills: ["TypeScript", "JavaScript", "React", "Next.js", "Ruby on Rails", "Python", "Vue", "HTML", "CSS"],
    },
    {
      name: "Testing",
      sortOrder: 2,
      skills: ["TDD", "RSpec", "Vitest", "Testing Library", "Playwright", "Cypress"],
    },
    {
      name: "Data & APIs",
      sortOrder: 3,
      skills: ["PostgreSQL", "Drizzle ORM", "REST APIs", "Redis", "MySQL", "SQLite"],
    },
    {
      name: "Tools & DevOps",
      sortOrder: 4,
      skills: ["Git", "GitHub Actions", "CircleCI", "Docker", "Vercel", "Heroku", "Figma", "Jira"],
    },
  ],
};
