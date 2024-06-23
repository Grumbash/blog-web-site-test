"use server";

import axios from "@/axiosConfig";
import { Article } from "@/types";

export async function getArticles(): Promise<Article[]> {
  const res = await axios.get(`/articles`);
  return res.data;
}
