import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
   const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }]) 
   const [ newName, setNewName ] = useState('')
   
   const addPerson = (event) => {
      event.preventDefault()

      if (newName.length > 0) {
         const personObject = {
            name: newName
         }
      
         setPersons(persons.concat(personObject))
         setNewName('')
      }
      else {
         alert('please insert a value in the form field')
      }
   }
   
   const handleNewNameChange = (event) => {
      setNewName(event.target.value)
   }

   return (
      <div>
         <h2>Phonebook</h2>
         <form onSubmit={addPerson}>
            <div>
               name: <input value={newName} onChange={handleNewNameChange} />
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