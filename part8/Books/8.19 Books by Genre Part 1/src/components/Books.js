import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries'

const BooksList = ({genre}) => {
   const booksResult = useQuery(ALL_BOOKS, {
      variables: {genre}
   })

   if (booksResult.loading) {
      return <div>Loading...</div>
   }

   const books = booksResult.data.allBooks
   
   return (
      <table>
         <tbody>
            <tr>
               <th></th>
               <th>author</th>
               <th>published</th>
            </tr>
            {books.map((b) => (
               <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}

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