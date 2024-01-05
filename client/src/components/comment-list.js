export const CommentList = ({ comments }) => {
  return (
    <ul>
      {
        comments !== null && comments !== undefined
          ? comments.map(comment => (
            <li
              className={`text-xs ${comment.status === 'rejected' ? 'text-red-300' : comment.status === 'pending' ? 'text-blue-500' : null}`}
              key={comment.id}
            >
            - {comment.status === 'approved' ? comment.content.trim() : comment.status === 'rejected' ? 'This comment has been rejected' : 'This comment is awaiting moderation'}
            </li>
            )
          )
          : null
      }
    </ul>
  );
}

