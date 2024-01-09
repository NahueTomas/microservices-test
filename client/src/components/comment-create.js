import { useState } from "react"

import { createComment } from '../services/api/comments/create-comment'

export const CommentCreate = ({ postId }) => {
  const [formState, setFormState] = useState({
    loading: false,
    error: false,
    errorMessage: null
  })
  const [content, setContent] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    setFormState({
      loading: true,
      error: false,
      errorMessage: null
    })
    const result = await createComment(postId, content)

    if(result.error) {
      setFormState({
        loading: false,
        error: true,
        errorMessage: result.error
      })

      return null
    }

    setFormState({
      loading: false,
      error: false,
      errorMessage: null
    })
    setContent("")
    window.location.reload()
    return null
  }

  return (
  <form
    onSubmit={onSubmit}
    className="flex flex-column align-start"
  >
    <div className="mb-1">
      <label className="text-sm" id="create-post-label">Comment:</label>
      <div className="flex">
        <input
          className="rounded-l-md border text-sm px-2 w-100 w-[90%]"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button
          className="w-[10%] rounded-r-md px-4 bg-blue-400 text-sm text-white hover:bg-blue-300"
          disabled={formState.loading}
        >
          {formState.loading ? '...' : '>'}
        </button>
      </div>
    </div>
    {
      formState.error
        ? <small className="text-red-500 text-xs">{ formState.errorMessage }</small>
        : null
    }
  </form>
  );
}
