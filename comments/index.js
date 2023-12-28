import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'


import { randomBytes } from 'crypto'


const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsById = {}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsById[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex')
  const content = req.body.content

  const comments = commentsById[req.params.id] || []
  comments.push({id: commentId, content})
  commentsById[req.params.id] = comments

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id }
  }).catch(e => console.log(e))

  res.status(201).send(comments) 
})

app.post('/events', (req, res) => {
  console.log('Recieved Event', req.body)
  res.send({})
})

app.listen(4001, () => {
  console.log('Listen on por 4001')
}) 