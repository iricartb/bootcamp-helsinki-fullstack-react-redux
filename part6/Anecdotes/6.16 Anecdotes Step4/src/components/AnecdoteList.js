import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
   const dispatch = useDispatch()  
   const anecdotes = useSelector(state => state.anecdotes)
   const filter = useSelector(state => state.filter)

   const vote = (id) => {
      console.log('vote', id)

      dispatch(incrementAnecdote(id))

      dispatch(setNotification(`you voted '${anecdotes.filter(anecdote => anecdote.id === id)[0].content}' anecdote`))

      setTimeout(() => { dispatch(unsetNotification()) }, 5000)
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
                  <button onClick={() => vote(anecdote.id)}>vote</button>
               </div>
            </div>
         )}
      </>
   )
}

export default AnecdoteList