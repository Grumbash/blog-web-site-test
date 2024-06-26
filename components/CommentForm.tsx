type CommentFormProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isPending: boolean;
};

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  value,
  onChange,
  isPending,
}) => {
  return (
    <form onSubmit={onSubmit}>
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
          value={value}
          onChange={onChange}
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
  );
};
