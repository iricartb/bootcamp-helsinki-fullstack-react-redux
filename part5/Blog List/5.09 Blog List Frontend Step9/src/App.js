/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
   const [ blogs, setBlogs ] = useState([])
   const [ username, setUsername ] = useState('')
   const [ password, setPassword ] = useState('') 
   const [ user, setUser ] = useState(null)
   const [ notification, setNotification ] = useState({})
   const blogFormRef = useRef()

   useEffect(() => {
      getBlogs()
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

   const addBlog = async (blogObject) => {
      blogService.setToken(user.token)

      const newBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(newBlog))

      blogFormRef.current.toggleVisibility()

      showNotification(`${newBlog.title} has been added successfully`, true)
   }

   const updateBlog = async (id, blogObject) => {
      blogService.setToken(user.token)
      
      const newBlog = await blogService.updateById(id, blogObject)

      setBlogs(blogs.map(blog => blog.id !== id ? blog : newBlog))

      showNotification(`${newBlog.title} has been updated successfully`, true)
   }

   const loginForm = () => (
      <LoginForm handleLogin={handleLogin} handleUsernameChange={({target}) => setUsername(target.value)} handlePasswordChange={({target}) => setPassword(target.value)} username={username} password={password} />
   )

   const blogForm = () => (
      <Toggable buttonLabel="new blog" ref={blogFormRef}>
         <BlogForm blogs={blogs} addBlog={addBlog} updateBlog={updateBlog} getBlogs={getBlogs} showNotification={showNotification} />
      </Toggable>
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

   blogs.sort((b1, b2) => (
      b2.likes - b1.likes
   ))
   
   return (
      <div>
         <h2>blogs</h2>

         <Notification message={notification.message} success={notification.success} />

         <p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>

         {blogForm()}

         {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} getBlogs={getBlogs} showNotification={showNotification} />
         )}
      </div>
   )
}

export default App