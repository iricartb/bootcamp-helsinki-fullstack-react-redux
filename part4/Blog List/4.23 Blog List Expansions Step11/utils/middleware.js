/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
   logger.info('Method:', request.method)
   logger.info('Path:  ', request.path)
   logger.info('Body:  ', request.body)
   logger.info('---')

   next()
}

const tokenExtractor = (request, response, next) => {
   const authorization = request.get('authorization')
   let token = ''

   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7)
   }

   request.token = token

   next()
}

const userExtractor = async (request, response, next) => {
   const decodedToken = jwt.verify(request.token, process.env.SECRET)

   if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
   }

   request.user = await User.findById(decodedToken.id)

   next()
}

const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
   logger.error(error.message)

   if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
   } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
   }
   else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'invalid token' })
   }

   next(error)
}

module.exports = {
   requestLogger,
   tokenExtractor,
   userExtractor,
   unknownEndpoint,
   errorHandler
}