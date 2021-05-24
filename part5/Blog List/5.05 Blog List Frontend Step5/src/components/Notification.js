import React from 'react'

const Notification = ({message, success}) => {
   if ((message === undefined) || (message === null) || (message.length === 0)) {
      return null
   }
   
   return (
      <div className={(success ? 'notification success' : 'notification error')}>
         {message}
      </div>
   )
}

export default Notification