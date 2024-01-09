import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const eventBusUrl = process.env.EVENT_BUS_URL


const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
  const event = req.body

  if(event.type === 'CommentCreated') {
    const status = event.data.content.includes('orange') ? 'rejected' : 'approved'
    await axios.post(`${eventBusUrl}/events`, {
      type: 'CommentModerated',
      data: {
        id: event.data.id,
        postId: event.data.postId,
        content: event.data.content,
        status,
      }
    })
  }

  res.send({ status: 'OK' })
})

app.listen(4003, () => {
  console.log("Listen on por 4003")
})
