const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
   name: String,
   username: {
      type: String,
      minlength: 3,
      unique: true,
      required: true
   },
   password: {
      type: String,
      required: true
   }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.password
   }
})

const User = mongoose.model('User', userSchema)

module.exports = User