/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
   await Blog.deleteMany({})

   for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
   }
})

test('blogs are returned as json', async () => {
   await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('blogs has the id parameter as a unique identifier', () => {
   const blog = new Blog()

   expect(blog.id).toBeDefined()
})

describe('addition of a new blog', () => {
   test('succeeds with valid data', async () => {
      const newBlog = {
         title: 'Advanced SQL Injection - IIS & DBO',
         author: 'Ivan Ricart Borges',
         url: 'https://advanced-sql-injection.blogspot.com',
         likes: 100
      }

      const loginResponse = await api.post('/api/login').send({ username: 'iricartb', password: 'ABCabc123' })

      const token = JSON.parse(loginResponse.text).token

      await api
         .post('/api/blogs')
         .auth(token, { type: 'bearer' })
         .send(newBlog)
         .expect(200)
         .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)

      expect(titles).toContain(
         'Advanced SQL Injection - IIS & DBO'
      )
   })

   test('succeeds without likes property data', async () => {
      const newBlogWithoutLikes = {
         title: 'Propagation Techniques Used By Viruses',
         author: 'Ivan Ricart Borges',
         url: 'https://propagation-techniques-used-by-viruses.blogspot.com'
      }

      const loginResponse = await api.post('/api/login').send({ username: 'iricartb', password: 'ABCabc123' })

      const token = JSON.parse(loginResponse.text).token

      await api
         .post('/api/blogs')
         .auth(token, { type: 'bearer' })
         .send(newBlogWithoutLikes)
         .expect(200)
         .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
   })

   test('fails with status code 400 if data is invalid', async () => {
      const newBlogWithoutTitle = {
         author: 'Ivan Ricart Borges',
         url: 'https://buffer-overflow-warftp-1.65.blogspot.com',
         likes: 50
      }

      const newBlogWithoutUrl = {
         title: 'WarFTP 1.65 USER Remote Buffer Overlow Exploit',
         author: 'Ivan Ricart Borges',
         likes: 50
      }

      const loginResponse = await api.post('/api/login').send({ username: 'iricartb', password: 'ABCabc123' })

      const token = JSON.parse(loginResponse.text).token

      await api
         .post('/api/blogs')
         .auth(token, { type: 'bearer' })
         .send(newBlogWithoutTitle)
         .expect(400)

      await api
         .post('/api/blogs')
         .auth(token, { type: 'bearer' })
         .send(newBlogWithoutUrl)
         .expect(400)
   })

   test('fails with status code 401 unauthorized token', async () => {
      const newBlog = {
         title: 'Advanced SQL Injection - IIS & DBO',
         author: 'Ivan Ricart Borges',
         url: 'https://advanced-sql-injection.blogspot.com',
         likes: 100
      }

      const token = 'cZJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'

      await api
         .post('/api/blogs')
         .auth(token, { type: 'bearer' })
         .send(newBlog)
         .expect(401)
         .expect('Content-Type', /application\/json/)
   })
})

describe('modification of a blog', () => {
   test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      blogToUpdate.title = 'Dark Side'

      const loginResponse = await api.post('/api/login').send({ username: 'iricartb', password: 'ABCabc123' })

      const token = JSON.parse(loginResponse.text).token

      await api
         .put(`/api/blogs/${blogToUpdate.id}`)
         .auth(token, { type: 'bearer' })
         .send(blogToUpdate)
         .expect(200)
         .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

      const titles = blogsAtEnd.map(b => b.title)

      expect(titles).toContain(blogToUpdate.title)
   })
})

describe('deletion of a blog', () => {
   test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const loginResponse = await api.post('/api/login').send({ username: 'iricartb', password: 'ABCabc123' })

      const token = JSON.parse(loginResponse.text).token

      await api
         .delete(`/api/blogs/${blogToDelete.id}`)
         .auth(token, { type: 'bearer' })
         .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)

      expect(titles).not.toContain(blogToDelete.title)
   })
})

afterAll(() => {
   mongoose.connection.close()
})