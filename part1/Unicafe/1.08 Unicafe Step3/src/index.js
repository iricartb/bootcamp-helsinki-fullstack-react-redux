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
      const oNewClicks = { 
         ...clicks,
         good: clicks.good + 1
      }

      setClicks(oNewClicks) 
   }

   const handleNeutralClick = () => {
      const oNewClicks = { 
         ...clicks,
         neutral: clicks.neutral + 1
      }

      setClicks(oNewClicks) 
   }

   const handleBadClick = () => {
      const oNewClicks = { 
         ...clicks,
         bad: clicks.bad + 1
      }

      setClicks(oNewClicks) 
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