import { CommentCreate } from "./comment-create";
import { CommentList } from "./comment-list";

export const Post = ({ title, id, comments }) => {
  return (
    <article className="border border-solid p-4 max-h-60 flex flex-column gap-2 justify-between">
      <h2 className="text-center text-xl font-bold">{title}</h2>
      <CommentList comments={comments}/>
      <CommentCreate postId={id} />
    </article>
  );
}

