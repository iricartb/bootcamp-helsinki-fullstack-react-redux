import React from 'react'

const Person = ({person, onDelete}) => (
   <div>
      {person.name} {person.number} <input type="button" value="delete" onClick={() => onDelete(person.id)} />
   </div>
)

export default Person