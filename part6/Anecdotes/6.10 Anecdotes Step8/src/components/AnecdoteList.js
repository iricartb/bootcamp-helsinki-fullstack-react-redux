import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
   const dispatch = useDispatch()  
   const anecdotes = useSelector(state => state.anecdotes)

   const vote = (id) => {
      console.log('vote', id)

      dispatch(incrementAnecdote(id))
   }

   return (
      <>
         {anecdotes.map(anecdote =>
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