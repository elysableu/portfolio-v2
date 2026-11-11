import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elysa Ward | Full-Stack Software Engineer",
  description:
    "Full-stack engineer working in React, Next.js, and Ruby on Rails. Projects, experience, and skills.",
  // The site is dark by design. This tells the Dark Reader extension not to
  // rewrite inline styles, which would otherwise cause hydration mismatches.
  // (Next.js drops empty values, and the extension only checks that the tag exists.)
  other: { "darkreader-lock": "true" },
};

export const viewport: Viewport = {
  themeColor: "#05060d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
