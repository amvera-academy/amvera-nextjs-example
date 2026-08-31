import { dataFile } from "../../../lib/items";

export const runtime = "nodejs";

export function GET() {
  return Response.json({ ok: true, framework: "Next.js", storage: dataFile });
}
