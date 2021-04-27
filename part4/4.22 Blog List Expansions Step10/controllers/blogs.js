/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })

   response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
   const body = request.body

   const decodedToken = jwt.verify(request.token, process.env.SECRET)

   if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
   }

   const user = await User.findById(decodedToken.id)

   if (user) {
      if (body.likes === undefined) {
         body.likes = 0
      }

      const blog = new Blog({
         title: body.title,
         author: body.author,
         url: body.url,
         likes: body.likes,
         user: user._id
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.json(savedBlog)
   }
   else {
      return response.status(404).json({
         error: 'user not found'
      })
   }
})

blogsRouter.put('/:id', async (request, response) => {
   const decodedToken = jwt.verify(request.token, process.env.SECRET)

   if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
   }

   const user = await User.findById(decodedToken.id)

   if (user) {
      const blog = await Blog.findById(request.params.id)

      if (blog) {
         if (blog.user.toString() === decodedToken.id.toString()) {
            const body = request.body

            const blog = {
               title: body.title,
               author: body.author,
               url: body.url,
               likes: body.likes
            }

            const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

            response.json(updatedBlog)
         }
         else {
            return response.status(403).json({
               error: 'action not allowed'
            })
         }
      }
      else {
         return response.status(404).json({
            error: 'blog not found'
         })
      }
   }
   else {
      return response.status(404).json({
         error: 'user not found'
      })
   }
})

blogsRouter.delete('/:id', async (request, response) => {
   const decodedToken = jwt.verify(request.token, process.env.SECRET)

   if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
   }

   const user = await User.findById(decodedToken.id)

   if (user) {
      const blog = await Blog.findById(request.params.id)

      if (blog) {
         if (blog.user.toString() === decodedToken.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)

            response.status(204).end()
         }
         else {
            return response.status(403).json({
               error: 'action not allowed'
            })
         }
      }
      else {
         return response.status(404).json({
            error: 'blog not found'
         })
      }
   }
   else {
      return response.status(404).json({
         error: 'user not found'
      })
   }
})

module.exports = blogsRouter