const { ObjectID } = require('mongodb')
const Blog = require('../models/blog')
const User = require('../models/user')

const blogObjectId = new ObjectID('6087522fcdaca92fc80f4f3b')
const userObjectId = new ObjectID('608752325c0e902fc89e841f')

const initialBlogs = [
   {
      _id: blogObjectId,
      title: 'LinkedIn - Open Redirect Vulnerability - Protection Mechanism Bypass',
      author: 'Ivan Ricart Borges',
      url: 'https://linkedin-open-redirect-vulnerability.blogspot.com',
      likes: 100,
      user: userObjectId
   }
]

const initialUsers = [
   {
      _id: userObjectId,
      name: 'Ivan Ricart Borges',
      username: 'iricartb',
      password: 'ABCabc123',
      blogs: [ blogObjectId ]
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