import { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notify from './components/Notify'

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

const App = () => {
   const [page, setPage] = useState('authors')
   const [token, setToken] = useState(null)
   const [notify, setNotify] = useState(null)
   const authorsResult = useQuery(ALL_AUTHORS)
   const client = useApolloClient()

   const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()

      setPage('authors')
   }

   if (authorsResult.loading) {
      return <div>Loading...</div>
   }

   return (
      <div>
         <HeaderMenu setPage={setPage} token={token} logout={logout} setNotify={setNotify} />

         <Authors show={page === 'authors'} authors={authorsResult.data.allAuthors} />

         <Books show={page === 'books'} />

         <NewBook show={page === 'add'} />

         <Login show={page === 'login'} setPage={setPage} setToken={setToken} setNotify={setNotify} />

         <Notify notify={notify} />
      </div>
   )
}

export default App