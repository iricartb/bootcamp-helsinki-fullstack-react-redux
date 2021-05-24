/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
   const [ blogs, setBlogs ] = useState([])
   const [ username, setUsername ] = useState('')
   const [ password, setPassword ] = useState('') 
   const [ user, setUser ] = useState(null)
   const [ errorMessage, setErrorMessage ] = useState(null)
   
   useEffect(() => {
      blogService.getAll().then(blogs =>
         setBlogs(blogs)
      )  
   }, [])

   useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      
      if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON)
         
         setUser(user)
      }
   }, [])

   const handleLogin = async (event) => {
      event.preventDefault()
   
      try {
         const user = await loginService.login({username, password})
         
         window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 

         setUser(user)
         setUsername('')
         setPassword('')
      } catch (exception) {
         setErrorMessage(`An error occurred in the login action: ${exception.response.data.error}`)
         
         setTimeout(() => { 
            setErrorMessage(null)
         }, 5000)
      }
   }

   const handleLogout = () => {
      window.localStorage.removeItem('loggedBlogappUser')

      setUser(null)
   }
   
   if (user === null) {
      return (
         <div>
            <h2>Log in to application</h2>
          
            {errorMessage}
            
            <form onSubmit={handleLogin}>
               <div>
                  username:
                  <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
               </div>
               <div>
                  password:
                  <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
               </div>
            
               <button type="submit">login</button>
            </form>
         </div>
      )
   }

   return (
      <div>
         <h2>Blogs</h2>

         <p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>

         {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
         )}
      </div>
   )
}

export default App