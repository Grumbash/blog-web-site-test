import { CommentType } from "@/types";

type CommentProps = {
  comment: CommentType;
};

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="border-b py-2">
      <p className="font-bold">{comment.author}</p>
      <p className="text-gray-600">{comment.content}</p>
      <p className="text-gray-400 text-sm">
        {new Date(comment.date).toLocaleString()}
      </p>
    </div>
  );
};
