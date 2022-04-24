import { useState } from 'react'
import BooksList from './BooksList'

const Books = ({show}) => {
   const [genre, setGenre] = useState()
   
   const changeGenre = (genre) => {
      setGenre(genre)
   }

   if (!show) {
      return null
   }

   return (
      <div>
         <h2>books</h2>

         <BooksList genre={genre}/>

         <div>
            <button onClick={() => changeGenre('agile')}>agile</button>
            <button onClick={() => changeGenre('classic')}>classic</button>
            <button onClick={() => changeGenre('crime')}>crime</button>
            <button onClick={() => changeGenre('design')}>design</button>
            <button onClick={() => changeGenre('patterns')}>patterns</button>
            <button onClick={() => changeGenre('programming')}>patterns</button>
            <button onClick={() => changeGenre('refactoring')}>refactoring</button>
            <button onClick={() => changeGenre()}>all genres</button>
         </div>
      </div>
   )
}

export default Books