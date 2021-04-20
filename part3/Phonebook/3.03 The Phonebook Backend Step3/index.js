const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')

const app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

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

app.get('/api/persons/:id', (request, response) => {
   const id = Number(request.params.id)
   const person = persons.find(person => person.id === id)

   if (person) {
      response.json(person)
   } else {
      response.status(404).end()
   }
})

const PORT = 3001

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})