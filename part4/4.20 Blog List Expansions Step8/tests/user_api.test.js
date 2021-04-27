/* eslint-disable no-undef */
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
   await User.deleteMany({})

   for (let user of helper.initialUsers) {
      let userObject = new User(user)

      userObject.password = await bcrypt.hash(userObject.password, 10)

      await userObject.save()
   }
})

test('users are returned as json', async () => {
   await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('users has the id parameter as a unique identifier', () => {
   const user = new User()

   expect(user.id).toBeDefined()
})

describe('addition of a new user', () => {
   test('succeeds with valid data', async () => {
      const newUser = {
         name: 'Jorge Merino Peña',
         username: 'jmerino',
         password: 'AAAaaa111'
      }

      await api
         .post('/api/users')
         .send(newUser)
         .expect(200)
         .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

      const usernames = usersAtEnd.map(u => u.username)

      expect(usernames).toContain(
         'jmerino'
      )
   })

   test('fails with status code 400 if data is invalid', async () => {
      const newUserWithoutUsername = {
         name: 'Jorge Merino Peña',
         password: 'AAAaaa111'
      }

      const newUserWithoutPassword = {
         name: 'Jorge Merino Peña',
         username: 'jmerino'
      }

      const newUserWithShortLengthUsername = {
         name: 'Jorge Merino Peña',
         username: 'jm',
         password: 'AAAaaa111'
      }

      const newUserWithShortLengthPassword = {
         name: 'Jorge Merino Peña',
         username: 'jmerino',
         password: 'AA'
      }

      const newUserAlreadyExists = {
         name: 'Ivan Ricart Borges',
         username: 'iricartb',
         password: 'ABCabc123'
      }

      await api
         .post('/api/users')
         .send(newUserWithoutUsername)
         .expect(400)

      await api
         .post('/api/users')
         .send(newUserWithoutPassword)
         .expect(400)

      await api
         .post('/api/users')
         .send(newUserWithShortLengthUsername)
         .expect(400)

      await api
         .post('/api/users')
         .send(newUserWithShortLengthPassword)
         .expect(400)

      await api
         .post('/api/users')
         .send(newUserAlreadyExists)
         .expect(400)
   })
})

afterAll(() => {
   mongoose.connection.close()
})