/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const Blog = (props) => {
   const [ visible, setVisible ] = useState(false)

   const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
   }

   const btnDelete = {
      color: 'red',
      border: '1px solid red'
   }

   const showWhenVisible = { display: visible ? '' : 'none' }

   const toggleVisibility = () => {
      setVisible(!visible)
   }

   const updateBlogLikes = async (event) => {
      try {
         const blogObject = {
            title: props.blog.title,
            author: props.blog.author,
            url: props.blog.url,
            likes: (props.blog.likes + 1)
         }

         props.updateBlog(props.blog.id, blogObject)
      } catch (exception) {
         props.showNotification(`An error occurred in the update likes action: ${exception.response.data.error}`, false)

         props.getBlogs()
      }
   }

   const deleteBlog = async (event) => {
      try {
         if (window.confirm(`Do you want to remove the blog ${props.blog.title}?`)) {
            props.deleteBlog(props.blog.id)
         }
      } catch (exception) {
         props.showNotification(`An error occurred in the delete action: ${exception.response.data.error}`, false)

         props.getBlogs()
      }
   }

   return (
      <div style={blogStyle}>
         {props.blog.title} {props.blog.author} <button onClick={toggleVisibility}>view</button>
         <div style={showWhenVisible}>
            <div>{props.blog.url}</div>
            <div>likes {props.blog.likes} <button onClick={updateBlogLikes}>like</button></div>
            <div>{props.blog.user.name}</div>
            <button style={btnDelete} onClick={deleteBlog}>remove</button>
         </div>
      </div>
   )
}

export default Blog