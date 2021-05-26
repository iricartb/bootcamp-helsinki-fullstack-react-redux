/* eslint-disable no-undef */
describe('Blog app', function() {
   beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')

      const user = {
         name: 'Ivan Ricart Borges',
         username: 'iricartb',
         password: 'test'
      }

      cy.request('POST', 'http://localhost:3001/api/users/', user)

      cy.visit('http://localhost:3000')
   })

   it('Login form is shown', function() {
      cy.contains('Log in to application')
   })

   describe('Login',function() {
      it('Succeeds with correct credentials', function() {
         cy.get('#username').type('iricartb')
         cy.get('#password').type('test')
         cy.get('#login-button').click()

         cy.contains('Ivan Ricart Borges logged-in')
      })

      it('Fails with wrong credentials', function() {
         cy.get('#username').type('iricartb')
         cy.get('#password').type('bad_password')
         cy.get('#login-button').click()

         cy.get('.error')
            .should('contain', 'invalid username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')

         cy.get('html').should('not.contain', 'Ivan Ricart Borges logged-in')
      })
   })

   describe('When logged in', function() {
      beforeEach(function() {
         cy.login({ username: 'iricartb', password: 'test' })
      })

      it('A blog can be created', function() {
         cy.createBlog({ title: 'Blog test added', author: 'Ivan Ricart Borges', url: 'https://iricartb.blog.test', likes: 0 })

         cy.contains('Blog test added')
      })
   })
})