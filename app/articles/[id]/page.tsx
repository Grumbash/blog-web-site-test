import { notFound } from "next/navigation";
import { getArticleData, addComment } from "./actions";
import { Article } from "@/types";
import { ArticleDetail } from "@/componets/ArticleDetail";

type Params = {
  params: {
    id: string;
  };
};

export default async function ArticleDetailPage({ params }: Params) {
  let article: Article;
  try {
    article = await getArticleData(params.id);
  } catch {
    notFound();
  }

  return <ArticleDetail article={article} addComment={addComment} />;
 
}