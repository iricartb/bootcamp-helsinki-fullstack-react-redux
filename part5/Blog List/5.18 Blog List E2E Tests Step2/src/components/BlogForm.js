import React, {useState} from 'react'

const BlogForm = (props) => {
   const [ newBlogTitle, setNewBlogTitle ] = useState('')
   const [ newBlogAuthor, setNewBlogAuthor ] = useState('')
   const [ newBlogUrl, setNewBlogUrl ] = useState('')

   const addBlog = async (event) => {
      event.preventDefault()

      try {
         if ((newBlogTitle.length > 0) && (newBlogAuthor.length > 0) && (newBlogUrl.length > 0)) {
            const blogsExist = props.blogs.filter(blog => blog.title.toLowerCase() === newBlogTitle.toLowerCase())

            const blogObject = {
               title: newBlogTitle,
               author: newBlogAuthor,
               url: newBlogUrl
            }

            if (blogsExist.length === 0) {
               props.addBlog(blogObject)
            }
            else {
               props.updateBlog(blogsExist[0].id, blogObject)
            }

            setNewBlogTitle('')
            setNewBlogAuthor('')
            setNewBlogUrl('')
         }
         else {
            alert('please insert a value in the form fields')
         }
      } catch (exception) {
         props.showNotification(`An error occurred in the add action: ${exception.response.data.error}`, false)

         props.getBlogs()
      }
   }

   return (
      <div>
         <h2>Create a new blog</h2>

         <form onSubmit={addBlog}>
            <div>
               title:
               <input type="text" value={newBlogTitle} id="title" name="Title" onChange={({target}) => setNewBlogTitle(target.value)} />
            </div>

            <div>
               author:
               <input type="text" value={newBlogAuthor} id="author" name="Author" onChange={({target}) => setNewBlogAuthor(target.value)} />
            </div>

            <div>
               url:
               <input type="text" value={newBlogUrl} id="url" name="Url" onChange={({target}) => setNewBlogUrl(target.value)} />
            </div>

            <button type="submit">save</button>
         </form>
      </div>
   )
}

export default BlogForm