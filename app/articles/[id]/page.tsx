import { notFound } from "next/navigation";
import { getArticleData, addComment } from "./actions";
import { ArticleType } from "@/types";
import { ArticleDetails } from "@/components/ArticleDetails";

type Params = {
  params: {
    id: string;
  };
};

export default async function ArticleDetailPage({ params }: Params) {
  let article: ArticleType;
  try {
    article = await getArticleData(params.id);
  } catch {
    notFound();
  }

  return <ArticleDetails article={article} addComment={addComment} />;
}
