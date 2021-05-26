import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
   let component
   let addBlog

   beforeEach(() => {
      addBlog = jest.fn()

      const blogs = []

      component = render(
         <BlogForm blogs={blogs} addBlog={addBlog} />
      )
   })

   test('<BlogForm /> updates parent state and calls onSubmit', () => {
      const form = component.container.querySelector('form')

      const inputTitle = component.container.querySelector('#title')
      fireEvent.change(inputTitle, {
         target: { value: 'Blog title testing' }
      })

      const inputAuthor = component.container.querySelector('#author')
      fireEvent.change(inputAuthor, {
         target: { value: 'Blog author testing' }
      })

      const inputUrl = component.container.querySelector('#url')
      fireEvent.change(inputUrl, {
         target: { value: 'Blog url testing' }
      })

      fireEvent.submit(form)

      expect(addBlog.mock.calls).toHaveLength(1)
      expect(addBlog.mock.calls[0][0].title).toBe('Blog title testing')
      expect(addBlog.mock.calls[0][0].author).toBe('Blog author testing')
      expect(addBlog.mock.calls[0][0].url).toBe('Blog url testing')
   })
})