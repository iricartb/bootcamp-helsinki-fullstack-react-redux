import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
   const [ persons, setPersons ] = useState([])
   const [ filterName, setFilterName ] = useState('')
   const [ newName, setNewName ] = useState('')
   const [ newNumber, setNewNumber ] = useState('')

   const hook = () => {
      getPersons()
   }

   useEffect(hook, [])

   const getPersons = () => {
      personService
         .getAll()
         .then(listPersons => {
            setPersons(listPersons)
         })
         .catch(error => {
            console.error("An error occurred in the get action: ", error)
         })  
   }

   const addPerson = (event) => {
      event.preventDefault()

      if ((newName.length > 0) && (newNumber.length > 0)) {
         const personsExist = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())

         if (personsExist.length === 0) { 
            const personObject = {
               name: newName,
               number: newNumber,
            }
      
            personService
               .create(personObject)
               .then(newPerson => {
                  setPersons(persons.concat(newPerson))
               })
               .catch(error => {
                  console.error("An error occurred in the add action: ", error)
                  getPersons()
               })
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
   
   const deletePerson = (id) => {
      const personsDelete = persons.filter(person => person.id === id)
      
      if (personsDelete.length > 0) {
         if (window.confirm(`Do you want to delete ${personsDelete[0].name} ?`)) {
            personService
               .delete(id)
               .then(result => {
                  setPersons(persons.filter(person => person.id !== id))
               })
               .catch(error => {
                  console.error("An error occurred in the delete action: ", error)
                  getPersons()
               })
         }
      }
      else {
         getPersons()
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
         <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App