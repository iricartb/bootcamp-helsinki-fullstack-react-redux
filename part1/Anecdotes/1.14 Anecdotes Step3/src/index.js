import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const App = ({anecdotes}) => {
   const [selected, setSelected] = useState(0)
   const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

   let maxAnacdotePointsIndex = points.indexOf(Math.max(...points));

   const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
   }

   const handleVoteClick = () => { 
      const copyPoints = [...points]

      copyPoints[selected]++

      setPoints(copyPoints) 
   }
  
   const handleNextAnecdoteClick = () => { setSelected(getRandomInt(0, anecdotes.length)) }

   return (
      <div>
         <h1>Anecdote of the day</h1>
         <div>{anecdotes[selected]}</div>
         <div>has {points[selected]} votes</div>

         <button onClick={handleVoteClick}>vote</button>
         <button onClick={handleNextAnecdoteClick}>next anecdote</button>

         <h1>Anecdote with most votes</h1>
         <div>{anecdotes[maxAnacdotePointsIndex]}</div>
         <div>has {points[maxAnacdotePointsIndex]} votes</div>
      </div>
   )
}

const anecdotes = [
   'If it hurts, do it more often',
   'Adding manpower to a late software project makes it later!',
   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
   'Premature optimization is the root of all evil.',
   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
   <App anecdotes={anecdotes} />,
   document.getElementById('root')
)