export const CommentList = ({ comments }) => {
  return (
    <ul>{
      comments !== null && comments !== undefined
        ? comments.map(comment => <li className='text-xs' key={comment.id}>- {comment.content.trim()}</li>)
        : null
    }</ul>
  );
}

