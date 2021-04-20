import { getAllByAltText } from '@testing-library/react'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Statistic = ({text, value, sufix}) => (
   <tr>
      <td>{text}</td>
      <td>{value} {sufix}</td>
   </tr>
)

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

         <table>
            <tbody>
               <Statistic text="good" value={clicks.good} />
               <Statistic text="neutral" value={clicks.neutral} />
               <Statistic text="bad" value={clicks.bad} />
               <Statistic text="all" value={getStatisticAll()} />
               <Statistic text="average" value={getStatisticAverage()} />
               <Statistic text="positive" value={getStatisticPositive()} sufix="%" />
            </tbody>
         </table>
      </div>
   )
}

const Button = ({handleClick, text}) => (
   <button onClick={handleClick}>
      {text}
   </button>
)

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

         <Button handleClick={handleGoodClick} text="good" />
         <Button handleClick={handleNeutralClick} text="neutral" />
         <Button handleClick={handleBadClick} text="bad" />

         <Statistics clicks={clicks} />
      </div>
   )
}

ReactDOM.render(<App />, 
   document.getElementById('root')
)