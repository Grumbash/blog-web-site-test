"use server";

import axios from "@/axiosConfig";
import { ArticleType, CommentType } from "@/types";

export async function getArticleData(id: string): Promise<ArticleType> {
  const res = await axios.get(`/articles/${id}`);
  return res.data;
}

export async function addComment(
  id: string,
  author: string,
  content: string
): Promise<CommentType> {
  const res = await axios.put(`/articles/${id}`, {
    author,
    content,
  });
  return res.data;
}
