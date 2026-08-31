import fs from "node:fs/promises";
import path from "node:path";

export const dataDir = process.env.DATA_DIR || (process.env.AMVERA ? "/data" : path.join(process.cwd(), "data"));
export const dataFile = path.join(dataDir, "items.json");

export async function readItems() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    return JSON.parse(await fs.readFile(dataFile, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await fs.writeFile(dataFile, "[]");
    return [];
  }
}

export async function writeItems(items) {
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2));
}
