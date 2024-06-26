import { CommentType } from "./Comment";

export type ArticleType = {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  comments: CommentType[];
};
