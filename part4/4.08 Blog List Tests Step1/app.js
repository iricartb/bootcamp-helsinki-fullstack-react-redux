/* eslint-disable no-undef */
const config = require('./utils/config')
const favicon = require('serve-favicon')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
   .then(() => {
      logger.info('connected to MongoDB')
   })
   .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
   })

app.use(cors())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app