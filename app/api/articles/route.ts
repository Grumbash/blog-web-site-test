import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(jsonDirectory + "/api.json", "utf8");
  const data = JSON.parse(fileContents);

  return NextResponse.json(data.articles);
}
