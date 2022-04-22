import { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
query {
   allAuthors  {
      name
      born
      bookCount
   }
}
`

const App = () => {
   const [page, setPage] = useState('authors')
   const authorsResult = useQuery(ALL_AUTHORS)

   if (authorsResult.loading) {
      return <div>Loading...</div>
   }

   return (
      <div>
         <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('add')}>add book</button>
         </div>

         <Authors show={page === 'authors'} authors={authorsResult.data.allAuthors} />

         <Books show={page === 'books'} />

         <NewBook show={page === 'add'} />
      </div>
   )
}

export default App