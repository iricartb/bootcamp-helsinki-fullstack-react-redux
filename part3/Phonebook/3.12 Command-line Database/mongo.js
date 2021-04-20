const mongoose = require('mongoose')

if ((process.argv.length < 3) || (process.argv.length == 4) || (process.argv.length > 5))  {
   console.log('Please provide the password and the optionals parameters: node mongo.js <password> [person_name] [person_number]')
   process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://root:${password}@cluster0.3jjxw.mongodb.net/db_helsinki?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
   name: String,
   number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
   console.log('phonebook:')
   Person
      .find({})
      .then(persons=> {
         persons.forEach(person =>
            console.log(`${person.name} ${person.number}`)
         )
         
         mongoose.connection.close()
      })
}
else {
   const person_name = process.argv[3]
   const person_number = process.argv[4]

   const person = new Person({
      name: person_name,
      number: person_number
   })

   person.save().then(result => {
      console.log(`added ${person_name} number ${person_number} to phonebook`)
      mongoose.connection.close()
   })
}