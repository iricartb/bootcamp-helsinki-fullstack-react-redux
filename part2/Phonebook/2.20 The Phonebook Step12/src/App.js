
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
   const [ persons, setPersons ] = useState([])
   const [ filterName, setFilterName ] = useState('')
   const [ newName, setNewName ] = useState('')
   const [ newNumber, setNewNumber ] = useState('')
   const [ notification, setNotification ] = useState({})

   const hook = () => {
      getPersons()
   }

   // eslint-disable-next-line
   useEffect(hook, [])

   const showNotification = (message, success) => {
      setNotification({
         'message': message,
         'success': success
      })
   
      setTimeout(() => {
         setNotification({
            'message': null,
            'success': success
         })
      }, 5000)
   }

   const getPersons = () => {
      personService
         .getAll()
         .then(listPersons => {
            setPersons(listPersons)
         })
         .catch(error => {
            console.error("An error occurred in the get action: ", error)
            showNotification(`An error occurred in the get action: ${error}`, false)
         })  
   }

   const addPerson = (event) => {
      event.preventDefault()

      if ((newName.length > 0) && (newNumber.length > 0)) {
         const personsExist = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())

         const personObject = {
            name: newName,
            number: newNumber,
         }
         
         if (personsExist.length === 0) {       
            personService
               .create(personObject)
               .then(newPerson => {
                  setPersons(persons.concat(newPerson))
                  showNotification(`${newPerson.name} has been added successfully`, true)
               })
               .catch(error => {
                  console.error("An error occurred in the add action: ", error)
                  getPersons()
               })
         }
         else {
            personService
               .update(personsExist[0].id, personObject)
               .then(newPerson => {
                  setPersons(persons.map(person => person.id !== personsExist[0].id ? person : newPerson))
                  showNotification(`${newPerson.name} has been updated successfully`, true)
               })
               .catch(error => {
                  console.error("An error occurred in the update action: ", error)
                  showNotification(`An error occurred in the update action: ${error}`, false)
                  getPersons()
               })
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
                  showNotification(`${personsDelete[0].name} has been deleted successfully`, true)
               })
               .catch(error => {
                  console.error("An error occurred in the delete action: ", error)
                  showNotification(`An error occurred in the delete action: ${error}`, false)
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
         <Notification message={notification.message} success={notification.success} />

         <Filter value={filterName} onChange={handleFilterNameChange} />

         <h2>Add a new</h2>
         <PersonForm nameValue={newName} numberValue={newNumber} onChangeName={handleNewNameChange} onChangeNumber={handleNewNumberChange} onSubmit={addPerson} />

         <h2>Numbers</h2>
         <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App