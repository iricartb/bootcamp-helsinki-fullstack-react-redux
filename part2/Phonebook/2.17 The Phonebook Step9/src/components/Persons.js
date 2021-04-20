import React from 'react'
import Person from './Person'

const Persons = ({persons, onDelete}) => (
   <div>
      {persons.map(person => 
         <Person key={person.name} person={person} onDelete={onDelete} />
      )}
   </div>
)

export default Persons