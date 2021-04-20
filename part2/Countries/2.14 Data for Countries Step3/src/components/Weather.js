import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
   const [ isLoading, setLoading ] = useState(true);
   const [ cityWeather, setCityWeather ] = useState([])

   const hook = () => {
      const params = {
         access_key: process.env.REACT_APP_WEATHER_API_KEY,
         query: city,
         units: 'f'
      }

      axios
         .get('http://api.weatherstack.com/current', {params})
         .then(response => {
            if (!response.data.error) {
               setCityWeather(response.data.current)
               setLoading(false);
            } else {
               console.log(`Response error: code: ${response.data.error.code}, info: ${response.data.error.info}`)
            }
         }).catch(error => {
            console.error("An error occurred: ", error);
         })
   }

   // eslint-disable-next-line
   useEffect(hook, [])

   if (isLoading) {
      return <div>Weather Loading ...</div>;
   }

   return (
      <div>
         <h2>Weather in {city}</h2>
         
         <div>
            <b>temperature:</b> {cityWeather.temperature} Celsius
         </div>

         {
            cityWeather.weather_icons.map(icon =>
               <img key={icon} src={icon} alt={icon} width="120px" height="90px" />
            )
         }

         <div>
            <b>wind:</b> {cityWeather.wind_speed} mph direction {cityWeather.wind_dir}
         </div>
      </div>
   )
}

export default Weather