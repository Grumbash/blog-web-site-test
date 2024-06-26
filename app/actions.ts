"use server";

import axios from "@/axiosConfig";
import { ArticleType } from "@/types";

export async function getArticles(): Promise<ArticleType[]> {
  const res = await axios.get(`/articles`);
  return res.data;
}
