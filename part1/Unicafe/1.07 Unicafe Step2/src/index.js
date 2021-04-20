import { getAllByAltText } from '@testing-library/react'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const App = () => {
   // save clicks of each button to its own state
   const [good, setGood] = useState(0)
   const [neutral, setNeutral] = useState(0)
   const [bad, setBad] = useState(0)

   const handleGoodClick = () => { setGood(good + 1) }
   const handleNeutralClick = () => { setNeutral(neutral + 1) }
   const handleBadClick = () => { setBad(bad + 1) }

   const getStatisticAll = () => {
      return good + neutral + bad
   }

   const getStatisticAverage = () => {
      let statistic = getStatisticAll()

      if (statistic > 0) {
         statistic = (((good * 1) + (neutral * 0) + (bad * -1)) / statistic)
      }

      return statistic
   }

   const getStatisticPositive = () => {
      let statistic = getStatisticAll()

      if (statistic > 0) {
         statistic = ((good * 100) / statistic)
      }

      return statistic
   }

   return (
      <div>
         <h1>give feedback</h1>

         <button onClick={handleGoodClick}>good</button>
         <button onClick={handleNeutralClick}>neutral</button>
         <button onClick={handleBadClick}>bad</button>

         <h1>statistics</h1>
         <div>good {good}</div>
         <div>neutral {neutral}</div>
         <div>bad {bad}</div>
         <div>all {getStatisticAll()}</div>
         <div>average {getStatisticAverage()}</div>
         <div>positive {getStatisticPositive()} %</div>
      </div>
   )
}

ReactDOM.render(<App />, 
   document.getElementById('root')
)