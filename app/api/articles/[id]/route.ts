import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

async function getArticleData(id: string) {
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(jsonDirectory + "/api.json", "utf8");
  const data = JSON.parse(fileContents);
  const article = data.articles.find(
    (article: any) => article.id.toString() === id
  );

  if (!article) {
    return null;
  }

  return article;
}

async function addComment(id: string, author: string, content: string) {
  const jsonDirectory = path.join(process.cwd(), "data");
  const fileContents = await fs.readFile(jsonDirectory + "/api.json", "utf8");
  const data = JSON.parse(fileContents);

  const article = data.articles.find(
    (article: any) => article.id.toString() === id
  );
  if (!article) {
    return null;
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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const article = await getArticleData(id);

  if (!article) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { author, content } = await req.json();

  const newComment = await addComment(id, author, content);

  if (!newComment) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(newComment);
}
