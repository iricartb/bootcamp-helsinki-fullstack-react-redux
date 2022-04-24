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

export default BooksList