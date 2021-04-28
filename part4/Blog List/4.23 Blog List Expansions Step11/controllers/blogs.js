const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })

   response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
   const body = request.body
   const user = request.user

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

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
   const user = request.user

   if (user) {
      const blog = await Blog.findById(request.params.id)

      if (blog) {
         if (blog.user.toString() === user.id.toString()) {
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

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
   const user = request.user

   if (user) {
      const blog = await Blog.findById(request.params.id)

      if (blog) {
         if (blog.user.toString() === user.id.toString()) {
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