import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
   const dispatch = useDispatch()
   const anecdotes = useSelector(state => state.anecdotes)
   const filter = useSelector(state => state.filter)

   const vote = (anecdote) => {
      const id = anecdote.id

      console.log('vote', id)

      dispatch(incrementAnecdote(anecdote))

      dispatch(setNotification(`you voted '${anecdote.content}' anecdote`, 10))
   }

   const anecdotesFiltered = anecdotes.filter((anecdote) => anecdote.content.includes(filter));

   return (
      <>
         {anecdotesFiltered.map(anecdote =>
            <div key={anecdote.id}>
               <div>
                  {anecdote.content}
               </div>
               <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
               </div>
            </div>
         )}
      </>
   )
}

export default AnecdoteList