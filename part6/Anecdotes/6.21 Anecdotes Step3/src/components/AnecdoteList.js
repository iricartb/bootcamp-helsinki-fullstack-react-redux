import React from 'react'
import { connect } from 'react-redux'
import { incrementAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
   const anecdotes = props.anecdotes
   const filter = props.filter

   const vote = (anecdote) => {
      const id = anecdote.id

      console.log('vote', id)

      props.incrementAnecdote(anecdote)

      props.setNotification(`you voted '${anecdote.content}' anecdote`, 10)
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

const mapStateToProps = (state) => {
   return { 
      anecdotes: state.anecdotes,
      filter: state.filter
   }
}

const mapDispatchToProps = {
   incrementAnecdote,
   setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList