const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
   const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

   response.json(users)
})

usersRouter.post('/', async (request, response) => {
   const body = request.body

   if (body.password) {
      if (body.password.length < 3) {
         return response.status(400).json({
            error: 'password field must have a minimum size of 3 characters'
         })
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
         username: body.username,
         name: body.name,
         password: passwordHash
      })

      const savedUser = await user.save()

      response.json(savedUser)
   }
   else {
      return response.status(400).json({
         error: 'password field must be filled'
      })
   }
})

module.exports = usersRouter