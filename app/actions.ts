"use server";

import { promises as fs } from "fs";
import path from "path";

import { ArticleType } from "@/types";

export async function getArticles(): Promise<ArticleType[]> {
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(jsonDirectory + "/api.json", "utf8");
  const data = JSON.parse(fileContents);

  return data.articles;
}
