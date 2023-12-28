import axios from 'axios'


export const getAPI = async url => {
  try {
    const result = await axios.get(url)

    if(result.status < 200 || result.status >= 300) throw new Error("error-post")
    return result.data
  } catch(err) {
    console.log(err)
    if(err.code === 'ERR_NETWORK') throw new Error("error-network")
    
    throw new Error(err.message)
  }
}
