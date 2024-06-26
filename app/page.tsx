import Link from "next/link";
import Image from "next/image";

import { getArticles } from "./actions";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex border rounded-lg overflow-hidden"
          >
            <div className="w-1/4 bg-gray-200">
              <Image
                width={315}
                height={200}
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-3/4 p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold">{article.title}</h2>
                <p className="mt-2 text-gray-600">{article.description}</p>
              </div>
              <Link
                href={`/articles/${article.id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded"
              >
                Button
              </Link>
            </div>
          </div>
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
