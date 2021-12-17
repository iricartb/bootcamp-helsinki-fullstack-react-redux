import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
   return {
      content: anecdote,
      id: getId(),
      votes: 0
   }
}

const initialState = anecdotesAtStart.map(asObject)

export const createAnecdote = (data) => ({
   type: 'NEW_ANECDOTE',
   data,
})

export const incrementAnecdote = (id) => ({
   type: 'INCREMENT_ANECDOTE',
   data: {
      id
   }
})

export const initializeAnecdotes = () => {
   return async dispatch => {
      const anecdotes = await anecdoteService.getAll()

      dispatch({
         type: 'INIT_ANECDOTES',
         data: anecdotes,
      })
   }
}

const compareVotes = (a, b) => { 
   if (a.votes > b.votes) return -1
   if (a.votes < b.votes) return 1

   return 0
}

const anecdoteReducer = (state = initialState, action) => {
   console.log('state now: ', state)
   console.log('action', action)

   if (action.type === 'INCREMENT_ANECDOTE') {
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)

      const changedAnecdote = { 
         ...anecdoteToChange, 
         votes: anecdoteToChange.votes + 1 
      }

      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort(compareVotes)
   }
   else if (action.type === 'NEW_ANECDOTE') {
      return [
         ...state, 
         {
            content: action.data.content,
            id: getId(),
            votes: 0
         }
      ]
   }
   else if (action.type === 'INIT_ANECDOTES') {
      return action.data
   }

   return state
}

export default anecdoteReducer