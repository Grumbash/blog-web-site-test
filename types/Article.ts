import { Comment } from "./Comment";

export type Article = {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  comments: Comment[];
};
