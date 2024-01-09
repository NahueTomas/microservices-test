import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const postsUrl = process.env.POSTS_URL
const commentsUrl = process.env.COMMENTS_URL
const queryUrl = process.env.QUERY_URL
const moderationUrl = process.env.MODERATION_URL


const app = express()
app.use(bodyParser.json())

const events = []

app.post('/events', (req, res) => {
  const event = req.body
  events.push(event)

  axios.post(`${postsUrl}/events`, event).catch(e => console.log(e))
  axios.post(`${commentsUrl}/events`, event).catch(e => console.log(e))
  axios.post(`${queryUrl}/events`, event).catch(e => console.log(e))
  axios.post(`${moderationUrl}/events`, event).catch(e => console.log(e))

  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, async () => {
  console.log("Listen on por 4005")
})
