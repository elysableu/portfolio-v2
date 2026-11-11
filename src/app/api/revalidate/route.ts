import { revalidateTag } from "next/cache";
import { handleRevalidate } from "@/lib/revalidate";

/**
 * POST /api/revalidate — called by `npm run db:seed` after content changes.
 * `expire: 0` means the next visitor gets fresh data, never the stale copy.
 */
export async function POST(request: Request) {
  return handleRevalidate(request, {
    secret: process.env.REVALIDATE_SECRET,
    revalidate: (tag) => revalidateTag(tag, { expire: 0 }),
  });
}
