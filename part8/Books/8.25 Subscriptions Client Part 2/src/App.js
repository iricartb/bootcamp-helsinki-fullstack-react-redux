import { useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notify from './components/Notify'
import Recommend from './components/Recommend'

const HeaderMenu = ({setPage, token, logout, setNotify}) => {
   const changePage = (page) => {
      setNotify('')
      setPage(page)
   }

   if (token) {
      return (
         <div>
            <button onClick={() => changePage('authors')}>authors</button>
            <button onClick={() => changePage('books')}>books</button>
            <button onClick={() => changePage('add')}>add book</button>
            <button onClick={() => changePage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
         </div>
      )
   }
   else {
      return (
         <div>
            <button onClick={() => changePage('authors')}>authors</button>
            <button onClick={() => changePage('books')}>books</button>
            <button onClick={() => changePage('login')}>login</button>
         </div>
      )
   }
}

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
   const uniqByTitle = (a) => {
      let seen = new Set()
      
      return a.filter((item) => {
         let k = item.title
         return seen.has(k) ? false : seen.add(k)
      })
   }

   cache.updateQuery(query, ({ allBooks }) => {
      return {
         allBooks: uniqByTitle(allBooks.concat(addedBook))
      }
   })
}

const App = () => {
   const [page, setPage] = useState('authors')
   const [token, setToken] = useState(null)
   const [notify, setNotify] = useState(null)
   const [favoriteGenre, setFavoriteGenre] = useState('')
   const authorsResult = useQuery(ALL_AUTHORS)
   const client = useApolloClient()

   const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()

      setFavoriteGenre('')
      setPage('authors')
   }

   useSubscription(BOOK_ADDED, {
      onSubscriptionData: ({ subscriptionData }) => {
         const addedBook = subscriptionData.data.bookAdded
         setNotify(`${addedBook.title} added`)
   
         updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      }
   })

   if (authorsResult.loading) {
      return <div>Loading...</div>
   }

   return (
      <div>
         <HeaderMenu setPage={setPage} token={token} logout={logout} setNotify={setNotify} />

         <Authors show={page === 'authors'} authors={authorsResult.data.allAuthors} />

         <Books show={page === 'books'} />

         <NewBook show={page === 'add'} />

         <Recommend show={page === 'recommend'} genre={favoriteGenre}/>

         <Login show={page === 'login'} setPage={setPage} token={token} setToken={setToken} setFavoriteGenre={setFavoriteGenre} setNotify={setNotify} />

         <Notify notify={notify} />
      </div>
   )
}

export default App