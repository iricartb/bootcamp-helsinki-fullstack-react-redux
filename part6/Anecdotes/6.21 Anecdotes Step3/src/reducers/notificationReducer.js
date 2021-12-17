const notificationAtStart = ''

const initialState = notificationAtStart

export const setNotification = (content, time) => {
   return async dispatch => {
      dispatch({
         type: 'SET_NOTIFICATION',
         data: {
            content
         }
      })

      let idTimeout = setTimeout(() => { dispatch(unsetNotification()) }, time * 1000)

      while (idTimeout--) {
         window.clearTimeout(idTimeout);
     }
   }
}

export const unsetNotification = () => {
   return async dispatch => {
      dispatch({
         type: 'UNSET_NOTIFICATION'
      })
   }
}

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