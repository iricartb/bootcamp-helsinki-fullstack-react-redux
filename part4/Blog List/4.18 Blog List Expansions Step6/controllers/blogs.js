const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })

   response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
   const body = request.body

   const user = await User.findById(body.userId)

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
      if (!body.userId) {
         return response.status(400).json({
            error: 'userId field must be filled'
         })
      }
      else {
         return response.status(404).json({
            error: 'user not found'
         })
      }
   }
})

blogsRouter.put('/:id', async (request, response) => {
   const body = request.body

   const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
   }

   const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

   response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
   await Blog.findByIdAndRemove(request.params.id)

   response.status(204).end()
})

module.exports = blogsRouter