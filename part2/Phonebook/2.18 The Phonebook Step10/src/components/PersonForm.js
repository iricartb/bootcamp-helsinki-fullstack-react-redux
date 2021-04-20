import React from 'react'

const PersonForm = ({nameValue, numberValue, onChangeName, onChangeNumber, onSubmit}) => (
   <form onSubmit={onSubmit}>
      <div>
         name: <input value={nameValue} onChange={onChangeName} />
      </div>
      <div>
         number: <input value={numberValue} onChange={onChangeNumber} />
      </div>
      <div>
         <button type="submit">add</button>
      </div>
   </form>
)

export default PersonForm