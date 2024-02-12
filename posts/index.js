import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const eventBusUrl = process.env.EVENT_BUS_URL

import { randomBytes } from 'crypto'


const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const title = req.body.title

  posts[id] = { id, title }

  await axios.post(`${eventBusUrl}/events`, {
    type: 'PostCreated',
    data: posts[id]
  }).catch(e => console.log(e))

  res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  console.log('Recieved Event', req.body)
  res.send({})
})

app.listen(4000, () => {
  console.log('Listen on por 4000')
})