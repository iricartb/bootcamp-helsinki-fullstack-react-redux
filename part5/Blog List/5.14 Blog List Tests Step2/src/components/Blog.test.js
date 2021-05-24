import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
   let component

   beforeEach(() => {
      const blog = {
         title: 'Blog title testing',
         author: 'Blog author testing',
         url: 'Blog url testing',
         likes: 12345,
         user: {
            name: 'Blog user testing'
         }
      }

      component = render(
         <Blog blog={blog} />
      )
   })

   test('renders title and author fields, extra information aren\'t displayed', () => {
      expect(component.container).toHaveTextContent(
         'Blog title testing'
      )

      expect(component.container).toHaveTextContent(
         'Blog author testing'
      )

      const div = component.container.querySelector('.blogExtraInformation')
      expect(div).toHaveStyle('display: none')
   })

   test('renders title, author and extra information fields clicking the show button', () => {
      const buttonView = component.getByText('view')
      fireEvent.click(buttonView)

      const div = component.container.querySelector('.blogExtraInformation')
      expect(div).not.toHaveStyle('display: none')

      expect(component.container).toHaveTextContent(
         'Blog url testing'
      )

      expect(component.container).toHaveTextContent(
         '12345'
      )
   })
})