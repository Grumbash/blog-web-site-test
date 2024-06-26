"use client";

import Image from "next/image";
import { useState, useTransition } from "react";

import { ArticleType, CommentType } from "@/types";
import { CommentForm } from "./CommentForm";
import { Comment } from "./Comment";

type ArticleDetailsProps = {
  addComment: (
    id: string,
    author: string,
    content: string
  ) => Promise<CommentType>;
  article: ArticleType;
};

export const ArticleDetails: React.FC<ArticleDetailsProps> = ({
  article,
  addComment,
}) => {
  const [comments, setComments] = useState(article.comments);
  /* 
    It's better to handle the comment state in the parent component. 
    This way, the CommentForm component can be reused in other parts of the application. 
    We can create a wrapper component that handles the comment state and passes the necessary props to the CommentForm component.
    But for now, we'll keep the comment state in this component to keep things simple.
  */
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
  };

  return (
    <section className="container mx-auto p-4">
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
          <CommentForm
            onSubmit={handleSubmit}
            onChange={handleCommentChange}
            value={comment}
            isPending={isPending}
          />
          {/*
              We can add a loading spinner here to indicate that the comments are being fetched.
              We can also add a button to fetch the comments when the user clicks on it.
              We can create a List component that fetches the comments and passes them to the ArticleDetails component.
            */}
          <div className="mt-4">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
