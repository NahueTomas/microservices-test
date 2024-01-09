import { useState } from "react"

import { createPost } from '../services/api/posts/create-post'

export const PostCreate = () => {
  const [formState, setFormState] = useState({
    loading: false,
    error: false,
    errorMessage: null
  })
  const [title, setTitle] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    setFormState({
      loading: true,
      error: false,
      errorMessage: null
    })
    const result = await createPost(title)

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
    setTitle("")
    window.location.reload()
    return null
  }

  return (
  <form
    onSubmit={onSubmit}
    className="border border-solid rounded-lg p-4 flex flex-column"
  >
    <h2 className="text-3xl font-bold mb-14 text-center">Create a POST!</h2>

    <div className="flex flex-column mb-4">
      <label className="text-xl" id="create-post-label">Post title:</label>
      <input
        className="border rounded-lg text-lg px-2 py-1"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </div>
    <button
      className="rounded-3xl py-2 px-4 bg-blue-400 text-white self-end hover:bg-blue-300"
      disabled={formState.loading}
    >
      {formState.loading ? 'Loading...' : 'Create'}
    </button>
    {
      formState.error
        ? <small className="text-red-500">{ formState.errorMessage }</small>
        : null
    }
  </form>
  );
}
