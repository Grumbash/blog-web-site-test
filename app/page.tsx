import { Article } from "@/components";

import { getArticles } from "./actions";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
      <div className="mt-4 text-center">
        <a href="#" className="text-blue-600">
          Read more
        </a>
      </div>
    </div>
  );
}
