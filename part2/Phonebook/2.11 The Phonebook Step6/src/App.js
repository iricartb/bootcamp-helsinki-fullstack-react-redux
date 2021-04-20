import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
   const [ persons, setPersons ] = useState([])
   const [ filterName, setFilterName ] = useState('')
   const [ newName, setNewName ] = useState('')
   const [ newNumber, setNewNumber ] = useState('')

   const hook = () => {
      axios
         .get('http://localhost:3001/persons')
         .then(response => {
            setPersons(response.data)
         })
   }

   useEffect(hook, [])

   const addPerson = (event) => {
      event.preventDefault()

      if ((newName.length > 0) && (newNumber.length > 0)) {
         const personsExist = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())

         if (personsExist.length === 0) { 
            const personObject = {
               name: newName,
               number: newNumber,
            }
      
            setPersons(persons.concat(personObject))
         }
         else {
            alert(`${newName} is already added to phonebook`)
         }

         setNewName('')
         setNewNumber('')
      }
      else {
         alert('please insert a value in the form fields')
      }
   }
   
   const handleFilterNameChange = (event) => {
      setFilterName(event.target.value)
   }

   const handleNewNameChange = (event) => {
      setNewName(event.target.value)
   }

   const handleNewNumberChange = (event) => {
      setNewNumber(event.target.value)
   }

   const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

   return (
      <div>
         <h2>Phonebook</h2>
         <Filter value={filterName} onChange={handleFilterNameChange} />

         <h2>Add a new</h2>
         <PersonForm nameValue={newName} numberValue={newNumber} onChangeName={handleNewNameChange} onChangeNumber={handleNewNumberChange} onSubmit={addPerson} />

         <h2>Numbers</h2>
         <Persons persons={personsToShow} />
    </div>
  )
}

export default App