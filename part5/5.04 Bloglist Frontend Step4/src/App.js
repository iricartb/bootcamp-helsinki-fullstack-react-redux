/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
   const [ blogs, setBlogs ] = useState([])
   const [ newBlogTitle, setNewBlogTitle ] = useState('')
   const [ newBlogAuthor, setNewBlogAuthor ] = useState('')
   const [ newBlogUrl, setNewBlogUrl ] = useState('')
   const [ username, setUsername ] = useState('')
   const [ password, setPassword ] = useState('') 
   const [ user, setUser ] = useState(null)
   const [ notification, setNotification ] = useState({})

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
   
   const showNotification = (message, success) => {
      setNotification({
         'message': message,
         'success': success
      })
   
      setTimeout(() => {
         setNotification({
            'message': null,
            'success': success
         })
      }, 5000)
   }

   const getBlogs = async () => {
      try {
         const blogs = await blogService.getAll()

         setBlogs(blogs)
      } catch (exception) {
         showNotification(`An error occurred in the get action: ${exception.response.data.error}`, false)
      }
   }

   const addBlog = async (event) => {
      event.preventDefault()

      try {
         if ((newBlogTitle.length > 0) && (newBlogAuthor.length > 0) && (newBlogUrl.length > 0)) {
            const blogsExist = blogs.filter(blog => blog.title.toLowerCase() === newBlogTitle.toLowerCase())

            blogService.setToken(user.token)
            
            const blogObject = {
               title: newBlogTitle, 
               author: newBlogAuthor,
               url: newBlogUrl
            }

            const newBlog = null

            if (blogsExist.length === 0) {
               const newBlog = await blogService.create(blogObject)

               setBlogs(blogs.concat(newBlog))

               showNotification(`${newBlog.title} has been added successfully`, true)
            }
            else {
               const newBlog = await blogService.update(blogsExist[0].id, blogObject)

               setBlogs(blogs.map(blog => blog.id !== blogsExist[0].id ? blog : newBlog))

               showNotification(`${newBlog.title} has been updated successfully`, true)
            }

            setNewBlogTitle('')
            setNewBlogAuthor('')
            setNewBlogUrl('')
         }
         else {
            alert('please insert a value in the form fields')
         }
      } catch (exception) {
         showNotification(`An error occurred in the add action: ${exception.response.data.error}`, false)

         getBlogs()
      }
   }

   const loginForm = () => (
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
   )

   const blogForm = () => (
      <form onSubmit={addBlog}>
         <div>
            title:
            <input type="text" value={newBlogTitle} name="Title" onChange={({target}) => setNewBlogTitle(target.value)} />
         </div>
         
         <div>
            author:
            <input type="text" value={newBlogAuthor} name="Author" onChange={({target}) => setNewBlogAuthor(target.value)} />
         </div>

         <div>
            url:
            <input type="text" value={newBlogUrl} name="Url" onChange={({target}) => setNewBlogUrl(target.value)} />
         </div>

         <button type="submit">save</button>
      </form>
   )

   const handleLogin = async (event) => {
      event.preventDefault()
   
      try {
         const user = await loginService.login({username, password})
         
         window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 

         blogService.setToken(user.token)

         setUser(user)
         setUsername('')
         setPassword('')
      } catch (exception) {
         showNotification(`An error occurred in the login action: ${exception.response.data.error}`, false)
      }
   }

   const handleLogout = () => {
      window.localStorage.removeItem('loggedBlogappUser')

      setUser(null)
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
   }

   if (user === null) {
      return (
         <div>
            <h2>Log in to application</h2>
          
            <Notification message={notification.message} success={notification.success} />
            
            {loginForm()}
         </div>
      )
   }

   return (
      <div>
         <h2>blogs</h2>

         <Notification message={notification.message} success={notification.success} />

         <p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>

         {blogForm()}

         {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
         )}
      </div>
   )
}

export default App