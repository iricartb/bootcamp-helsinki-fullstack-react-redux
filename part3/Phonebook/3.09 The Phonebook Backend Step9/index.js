const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.json())

morgan.token('body', (request, response) => {
   const body = request.body

   if (Object.keys(body).length !== 0) return JSON.stringify(body)

   return '-'
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
   { 
      id: 1,
      name: 'Arto Hellas',
      number: '040-123456'
   },
   {
      id: 2, 
      name: 'Ada Lovelace',
      number: '39-44-5323523'
   },
   { 
      id: 3,
      name: 'Dan Abramov',
      number: '12-43-234345'
   },
   { 
      id: 4,
      name: 'Mary Poppendieck',
      number: '39-23-6423122'
   }
]

app.get('/', (request, response) => {
   response.send('<h1>Phonebook API</h1>')
})

app.get('/info', (request, response) => {
   response.send(`<p>Phonebook has info for ${persons.length} peoples</p><p>${Date().toString()}</p>`)
})

app.get('/api/persons', (request, response) => {
   response.json(persons)
})

app.post('/api/persons', (request, response) => {
   const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
   const newPerson = request.body
   
   if ((!newPerson.name) || (!newPerson.number)) {
      return response.status(400).json({ 
         error: 'name and number fields must be filled' 
      })
   }
   else {
      const person = persons.find(person => person.name === newPerson.name)

      if (person) {
         return response.status(403).json({ 
            error: 'name field must be unique' 
         })
      }
   }

   newPerson.id = maxId + 1
   persons = persons.concat(newPerson)

   response.json(newPerson)
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

app.delete('/api/persons/:id', (request, response) => {
   const id = Number(request.params.id)
   persons = persons.filter(person => person.id !== id)
 
   response.status(204).end()
})

const PORT = 3001

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})