import { getAllByAltText } from '@testing-library/react'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Statistics = ({clicks}) => {
   const getStatisticAll = () => {
      return clicks.good + clicks.neutral + clicks.bad
   }

   const getStatisticAverage = () => {
      let statistic = getStatisticAll()

      if (statistic > 0) {
         statistic = (((clicks.good * 1) + (clicks.neutral * 0) + (clicks.bad * -1)) / statistic)
      }

      return statistic
   }

   const getStatisticPositive = () => {
      let statistic = getStatisticAll()

      if (statistic > 0) {
         statistic = ((clicks.good * 100) / statistic)
      }

      return statistic
   }
  
   if (getStatisticAll() === 0) {
      return (
         <div>
            <h1>statistics</h1>
            <div>No feedback given</div>
         </div>
      )
   }

   return (
      <div>
         <h1>statistics</h1>
         <div>good {clicks.good}</div>
         <div>neutral {clicks.neutral}</div>
         <div>bad {clicks.bad}</div>
         <div>all {getStatisticAll()}</div>
         <div>average {getStatisticAverage()}</div>
         <div>positive {getStatisticPositive()} %</div>
      </div>
   )
}

const App = () => {
   const [clicks, setClicks] = useState({
      good: 0,
      neutral: 0,
      bad: 0
   })

   const handleGoodClick = () => {
      const newClicks = { 
         ...clicks,
         good: clicks.good + 1
      }

      setClicks(newClicks) 
   }

   const handleNeutralClick = () => {
      const newClicks = { 
         ...clicks,
         neutral: clicks.neutral + 1
      }

      setClicks(newClicks) 
   }

   const handleBadClick = () => {
      const newClicks = { 
         ...clicks,
         bad: clicks.bad + 1
      }

      setClicks(newClicks) 
   }
  
   return (
      <div>
         <h1>give feedback</h1>

         <button onClick={handleGoodClick}>good</button>
         <button onClick={handleNeutralClick}>neutral</button>
         <button onClick={handleBadClick}>bad</button>

         <Statistics clicks={clicks} />
      </div>
   )
}

ReactDOM.render(<App />, 
   document.getElementById('root')
)