import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
   const [ persons, setPersons ] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]) 
   const [ newName, setNewName ] = useState('')
   const [ newNumber, setNewNumber ] = useState('')
   
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
   
   const handleNewNameChange = (event) => {
      setNewName(event.target.value)
   }

   const handleNewNumberChange = (event) => {
      setNewNumber(event.target.value)
   }

   return (
      <div>
         <h2>Phonebook</h2>
         <form onSubmit={addPerson}>
            <div>
               name: <input value={newName} onChange={handleNewNameChange} />
            </div>
            <div>
               number: <input value={newNumber} onChange={handleNewNumberChange} />
            </div>
            <div>
               <button type="submit">add</button>
            </div>
         </form>
         
         <h2>Numbers</h2>
         <div>
            {persons.map(person => 
               <Person key={person.name} person={person} />
            )}
         </div>
    </div>
  )
}

export default App