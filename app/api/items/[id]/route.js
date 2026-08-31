import { readItems, writeItems } from "../../../../lib/items";

export const runtime = "nodejs";

export async function DELETE(request, context) {
  const { id: value } = await context.params;
  const id = Number(value);
  const items = await readItems();
  const next = items.filter(item => item.id !== id);
  if (next.length === items.length) return Response.json({ error: "Item not found" }, { status: 404 });
  await writeItems(next);
  return Response.json({ deleted: true, id });
}
