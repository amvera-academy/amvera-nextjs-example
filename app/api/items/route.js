import { readItems, writeItems } from "../../../lib/items";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const items = await readItems();
  return Response.json({ items: items.toReversed(), count: items.length });
}

export async function POST(request) {
  const data = await request.json();
  const name = String(data.name || "").trim();
  if (!name || name.length > 120) return Response.json({ error: "Name must contain from 1 to 120 characters" }, { status: 400 });
  const items = await readItems();
  const item = { id: items.reduce((max, value) => Math.max(max, value.id), 0) + 1, name };
  items.push(item);
  await writeItems(items);
  return Response.json({ item }, { status: 201 });
}
