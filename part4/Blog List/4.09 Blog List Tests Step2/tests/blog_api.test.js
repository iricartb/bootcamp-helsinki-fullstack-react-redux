/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

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

afterAll(() => {
   mongoose.connection.close()
})