import { URL_QUERY } from '../index'
import { getAPI } from '../base/api-get.service'


export const getAllPostsWithComments = async () => {
  try {
    const data = await getAPI(URL_QUERY)
    return { data }
  } catch(error) {
    if(error.message === "error-get") return { error: 'There was an error getting the posts!' }
    if(error.message === "error-network") return { error: 'There was an error getting the posts!' }

    return { error: error.message }
  }
}
