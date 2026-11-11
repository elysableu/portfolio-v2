import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    // Two isolated environments: the data layer runs in Node against an
    // in-memory Postgres (PGlite); components render in jsdom.
    projects: [
      {
        extends: true,
        test: {
          name: "data",
          environment: "node",
          include: ["src/{db,lib}/**/*.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "ui",
          environment: "jsdom",
          include: ["src/{app,components}/**/*.test.tsx"],
          setupFiles: ["./src/test/setup-dom.ts"],
        },
      },
    ],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/test/**",
        "src/db/client.ts", // Neon connection: exercised by e2e, not unit tests
        "src/lib/content/index.ts", // Next.js cache wrapper: exercised by e2e
        "src/app/layout.tsx",
        "src/app/page.tsx",
        "src/app/api/**/route.ts", // thin Next.js adapters: exercised by e2e
      ],
      thresholds: { lines: 90, functions: 90, branches: 90, statements: 90 },
    },
  },
});
