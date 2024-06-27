"use server";

import { ArticleType } from "@/types";
import { promises as fs } from "fs";
import path from "path";

type FileTypes = {
  articles: ArticleType[];
};

export async function getArticleData(id: string) {
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(jsonDirectory + "/api.json", "utf8");
  const data: FileTypes = JSON.parse(fileContents);
  const article = data.articles.find((article) => article.id.toString() === id);

  if (!article) {
    throw new Error("Article not found");
  }

  return article;
}

export async function addComment(id: string, author: string, content: string) {
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(jsonDirectory + "/api.json", "utf8");
  const data: FileTypes = JSON.parse(fileContents);

  const article = data.articles.find((article) => article.id.toString() === id);

  if (!article) {
    throw new Error("Article not found");
  }

  const newComment = {
    id: article.comments.length + 1,
    author,
    content,
    date: new Date().toISOString(),
  };

  article.comments.push(newComment);

  await fs.writeFile(
    jsonDirectory + "/api.json",
    JSON.stringify(data, null, 2)
  );

  return newComment;
}
