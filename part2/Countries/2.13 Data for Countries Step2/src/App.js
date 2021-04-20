import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
   const [ countries, setCountries ] = useState([])
   const [ filterName, setFilterName ] = useState('')

   const hook = () => {
      axios
         .get('https://restcountries.eu/rest/v2/all')
         .then(response => {
            setCountries(response.data)
         }).catch(error => {
            console.error("An error occurred: ", error)
         })
   }

   useEffect(hook, [])
   
   const handleFilterNameChange = (event) => {
      setFilterName(event.target.value)
   }
   
   const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filterName.toLowerCase()))

   return (
      <div>
         <Filter value={filterName} onChange={handleFilterNameChange} />

         {
            (filterName.length > 0) 
            ?
               <Countries countries={countriesToShow} onShowDetail={handleFilterNameChange} />
            :
               <></>
         }
      </div>
   )
}

export default App