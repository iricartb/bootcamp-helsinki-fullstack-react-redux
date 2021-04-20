import React from 'react'
import Person from './Person'

const Persons = ({persons}) => (
   <div>
      {persons.map(person => 
         <Person key={person.name} person={person} />
      )}
   </div>
)

export default Persons