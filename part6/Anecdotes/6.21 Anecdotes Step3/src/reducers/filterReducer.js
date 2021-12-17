const filterAtStart = ''

const initialState = filterAtStart

export const setFilter = (content) => ({
   type: 'SET_FILTER',
   data: {
      content
   }
})

const filterReducer = (state = initialState, action) => {
   console.log('state now: ', state)
   console.log('action', action)

   if (action.type === 'SET_FILTER') {
      return action.data.content 
   }

   return state
}

export default filterReducer