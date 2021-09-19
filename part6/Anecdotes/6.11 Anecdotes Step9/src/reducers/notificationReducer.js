const notificationAtStart = ''

const initialState = notificationAtStart

export const setNotification = (content) => ({
   type: 'SET_NOTIFICATION',
   data: {
      content
   }
})

export const unsetNotification = () => ({
   type: 'UNSET_NOTIFICATION'
})

const notificationReducer = (state = initialState, action) => {
   console.log('state now: ', state)
   console.log('action', action)

   if (action.type === 'SET_NOTIFICATION') {
      return action.data.content 
   }
   else if (action.type === 'UNSET_NOTIFICATION') {
      return notificationAtStart
   }

   return state
}

export default notificationReducer