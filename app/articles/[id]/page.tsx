import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetails } from "@/components";
import { ArticleType } from "@/types";

import { getArticleData, addComment } from "./actions";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleData(params.id).catch(() => null);

  return {
    title: article?.title || "Article",
    description: article?.content || "Article content",
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  let article: ArticleType;
  try {
    article = await getArticleData(params.id);
  } catch {
    notFound();
  }

  return <ArticleDetails article={article} addComment={addComment} />;
}
