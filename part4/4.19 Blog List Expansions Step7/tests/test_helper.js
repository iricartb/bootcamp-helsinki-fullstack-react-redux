const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
   {
      title: 'LinkedIn - Open Redirect Vulnerability - Protection Mechanism Bypass',
      author: 'Ivan Ricart Borges',
      url: 'https://linkedin-open-redirect-vulnerability.blogspot.com',
      likes: 100
   }
]

const initialUsers = [
   {
      name: 'Ivan Ricart Borges',
      username: 'iricartb',
      password: 'ABCabc123'
   }
]

const blogsInDb = async () => {
   const blogs = await Blog.find({})

   return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
   const users = await User.find({})

   return users.map(user => user.toJSON())
}

module.exports = {
   initialBlogs,
   initialUsers,
   blogsInDb,
   usersInDb
}