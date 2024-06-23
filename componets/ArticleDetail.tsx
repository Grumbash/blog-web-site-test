"use client";

import Image from "next/image";
import { useState, useTransition } from "react";

import { Article, Comment } from "@/types";

type Props = {
  addComment: (id: string, author: string, content: string) => Promise<Comment>;
  article: Article;
};

export const ArticleDetail = ({ article, addComment }: Props) => {
  const [comments, setComments] = useState(article.comments);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const newComment = await addComment(
        String(article.id),
        "Anonymous",
        comment
      );
      setComments((prevComments) => [...prevComments, newComment]);
      setComment("");
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <div className="w-full md:w-3/4 lg:w-1/2">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={700}
            height={475}
            className="w-full h-auto object-cover"
          />
          <h1 className="text-3xl font-bold mt-4">{article.title}</h1>
          <p className="mt-2 text-gray-600">{article.description}</p>
          <p className="mt-4">{article.content}</p>
        </div>
        <div className="w-full md:w-3/4 lg:w-1/2 mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="comment"
              >
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={isPending}
            >
              Submit
            </button>
          </form>
          <div className="mt-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b py-2">
                <p className="font-bold">{comment.author}</p>
                <p className="text-gray-600">{comment.content}</p>
                <p className="text-gray-400 text-sm">
                  {new Date(comment.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
