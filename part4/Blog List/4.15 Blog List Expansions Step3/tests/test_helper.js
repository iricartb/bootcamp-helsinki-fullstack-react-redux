const Blog = require('../models/blog')

const initialBlogs = [
   {
      title: 'LinkedIn - Open Redirect Vulnerability - Protection Mechanism Bypass',
      author: 'Ivan Ricart Borges',
      url: 'https://linkedin-open-redirect-vulnerability.blogspot.com',
      likes: 100
   }
]

const blogsInDb = async () => {
   const blogs = await Blog.find({})

   return blogs.map(blog => blog.toJSON())
}

module.exports = {
   initialBlogs,
   blogsInDb
}