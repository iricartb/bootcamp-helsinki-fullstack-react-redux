import React from 'react'

const Country = ({country, detail}) => (
   <>
      {
         (detail)
         ?
            <div>
               <h1>{country.name}</h1>
               <div>capital {country.capital}</div>
               <div>population {country.population}</div>
               
               <h2>languages</h2>
               {
                  (country.languages.length > 0) 
                  ?
                     <ul>
                     {
                        country.languages.map(language => 
                           <li key={language.iso639_1}>{language.name}</li>
                        )
                     }  
                     </ul>
                  :
                     <>
                     </>
               }

               <img src={country.flag} alt={country.name} width="120px" height="90px" />
            </div>
         :
            <div>
               {country.name}
            </div>
      }
   </>
)

export default Country