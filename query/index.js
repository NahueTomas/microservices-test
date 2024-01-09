import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const eventBusUrl = process.env.EVENT_BUS_URL

const app = express()
app.use(bodyParser.json())
app.use(cors())

const handleEvent = (type, data) => {
  if(type === 'PostCreated') {
    const { id, title } = data
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
}

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  handleEvent(type, data)
  res.status(201).end()
})

app.listen(4002, async () => {
  console.log('Listen on por 4002')
  const res = await axios.get(`${eventBusUrl}/events`)
  
  for (let event of res.data) {
    console.log('Processing event:', event.type)
    handleEvent(event.type, event.data)
  }
})