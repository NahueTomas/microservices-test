import { useState, useEffect, useCallback } from 'react'

import { getAllPostsWithComments } from '../services/api/query/get-all-posts-with-comments'
import { Message } from './message' 
import { Post } from './post'


export const PostList = () => {
  const [postsState, setPostsState] = useState({
    loading: false,
    error: false,
    errorMessage: null,
    data: null
  })

  const getData = useCallback(async () => {
    const result = await getAllPostsWithComments()

    if(result.error) {
      setPostsState({
        loading: false,
        error: true,
        errorMessage: result.error,
        data: null
      })
    }

    const posts = Object.values(result.data).map(post => (post))

    setPostsState({
      loading: false,
      error: false,
      errorMessage: null,
      data: posts
    })
  }, [])

  useEffect(() => {
    getData()

    return () => {
      setPostsState({
        loading: false,
        error: false,
        errorMessage: null,
        data: null
      })
    }
  }, [getData])

  return (
  <div
    className="border border-solid rounded-lg min-h-96 p-4 grid grid-cols-3 gap-5"
  >
    {
      postsState.loading
        ? <Message>Loading...</Message>
        : null
    }
    {
      postsState.error
        ? <Message>{postsState.errorMessage}</Message>
        : null
    }
    {
      postsState.data !== null && postsState.data.length === 0
        ? <Message>There are not posts to see!</Message>
        : null
    }
    {
      postsState.data !== null && postsState.data.length > 0
        ? postsState.data.map(post => <Post title={post.title} id={post.id} key={post.id} comments={post.comments} />)
        : null
    }
  </div>
  );
}
