import { POST_POST } from '../index'
import { postAPI } from '../base/api-post.service'


export const createPost = async (title) => {
  try {
    const data = await postAPI(POST_POST, { title })
    return { data }
  } catch(error) {
    if(error.message === "error-post") return { error: 'There was an error creating the post!' }
    if(error.message === "error-network") return { error: 'There was an error creating the post!' }

    return { error: error.message }
  }
}