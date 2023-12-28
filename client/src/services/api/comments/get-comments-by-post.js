import { URL_COMMENTS } from '../index'
import { getAPI } from '../base/api-get.service'


export const getCommentsByPostId = async (postId) => {
  try {
    const data = await getAPI(`${URL_COMMENTS}/${postId}/comments`)
    return { data }
  } catch(error) {
    if(error.message === "error-get") return { error: `There was an error getting the comments from the post: ${postId}!` }
    if(error.message === "error-network") return { error: `There was an error gettig the comments from the post: ${postId}` }

    return { error: error.message }
  }
}
