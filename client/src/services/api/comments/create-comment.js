import { URL_COMMENTS } from '../index'
import { postAPI } from '../base/api-post.service'


export const createComment = async (postId, content) => {
  try {
    const data = await postAPI(`${URL_COMMENTS}/${postId}/comments`, { content })
    return { data }
  } catch(error) {
    if(error.message === "error-comment") return { error: `There was an error creating the comment by the post: ${postId}` }
    if(error.message === "error-network") return { error: `There was an error creating the comment by the post: ${postId}` }

    return { error: error.message }
  }
}