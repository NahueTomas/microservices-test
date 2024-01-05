import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body
  
  if(type === 'PostCreated') {
    const { id, title} = data
    posts[id] = { id, title, comments: [] }
  }

  else if(type === 'CommentCreated') {
    const { id, content, postId, status } = data
    posts[postId].comments.push({ id, content, status })
  }

  else if(type === 'CommentUpdated') {
    const { id, content, postId, status } = data
    const comment = posts[postId].comments.find(comment => comment.id === id)
    comment.status = status
    comment.content = content
  }

  res.status(201).end()
})

app.listen(4002, () => {
  console.log('Listen on por 4002')
})