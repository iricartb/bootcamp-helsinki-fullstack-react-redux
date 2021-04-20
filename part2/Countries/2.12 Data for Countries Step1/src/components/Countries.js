import React from 'react'
import Country from './Country'

const Countries = ({countries}) => (
   <div>
      {
         ((countries.length === 1)
            ?
               <Country key={countries[0].alpha2Code} country={countries[0]} detail={true} />
            :
            ((countries.length <= 10)
            ?
               countries.map(country => 
                  <Country key={country.alpha2Code} country={country} detail={false} />
               )
            :
               <div>Too many matches, specify another filter</div>
            )
         )
      }
   </div>
)

export default Countries