"use client";

import Image from "next/image";
import { useState, useTransition } from "react";

import { Article, Comment } from "@/types";
import { CommentForm } from "./CommentForm";

type Props = {
  addComment: (id: string, author: string, content: string) => Promise<Comment>;
  article: Article;
};

export const ArticleDetails = ({ article, addComment }: Props) => {
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

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }

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
          <CommentForm onSubmit={handleSubmit} onChange={handleCommentChange} value={comment} isPending={isPending}/>
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

