require('dotenv').config()
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.json())

morgan.token('body', (request, response) => {
   const body = request.body

   if (Object.keys(body).length !== 0) return JSON.stringify(body)

   return '-'
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = []

app.get('/', (request, response) => {
   response.send('<h1>Phonebook API</h1>')
})

app.get('/info', (request, response) => {
   response.send(`<p>Phonebook has info for ${persons.length} peoples</p><p>${Date().toString()}</p>`)
})

app.get('/api/persons', (request, response) => {
   Person.find({}).then(persons => {
      response.json(persons)
   })
})

app.post('/api/persons', (request, response) => {
   const newPerson = request.body
   
   if ((!newPerson.name) || (!newPerson.number)) {
      return response.status(400).json({ 
         error: 'name and number fields must be filled' 
      })
   }

   const person = new Person({
      name: newPerson.name,
      number: newPerson.number,
   })

   person.save().then(person => {
      response.json(person)
   })
})

app.get('/api/persons/:id', (request, response) => {
   const id = Number(request.params.id)
   const person = persons.find(person => person.id === id)

   if (person) {
      response.json(person)
   } else {
      response.status(404).end()
   }
})

app.delete('/api/persons/:id', (request, response, next) => {
   Person.findByIdAndRemove(request.params.id)
      .then(result => {
         response.status(204).end()
      })
      .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
   console.error(error.message)
 
   if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
   } 
 
   next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})