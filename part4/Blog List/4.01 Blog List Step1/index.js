/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
   title: String,
   author: String,
   url: String,
   likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
   response.send('<h1>Blog List API</h1>')
})

app.get('/api/blogs', (request, response) => {
   Blog
      .find({})
      .then(blogs => {
         response.json(blogs)
      })
})

app.post('/api/blogs', (request, response) => {
   const blog = new Blog(request.body)

   blog
      .save()
      .then(result => {
         response.status(201).json(result)
      })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})