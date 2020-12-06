describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/reset')
    cy.request('POST','http://localhost:3001/api/users', {username: 'swalling', password: 'abcd1234'})
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('input[type="submit"]').should('have.value','Submit')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get("#username").type('swalling')
      cy.get('#password').type('abcd1234')
      cy.get('input[type="submit"').click()
      cy.contains('logged in successfully')
    })

    it('fails with wrong credentials', function() {
      cy.get("#username").type('swalling')
      cy.get('#password').type('wrong')
      cy.get('input[type="submit"').click()
      cy.contains('wrong username or password').should('have.css','color','rgb(255, 0, 0)')
    })
  })
  
  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get("#username").type('swalling')
      cy.get('#password').type('abcd1234')
      cy.get('input[type="submit"').click()
    })

    it('A blog can be created', function() {
      cy.get('button').contains('show form').click()
      cy.get('.title').type('Cypress title')
      cy.get('.author').type('Cypress author')
      cy.get('.url').type('https://www.google.com')
      cy.get('#blogform').click()
      cy.contains('new blog added')
      cy.get('#bloglist').contains('Cypress title')
    })


    it('User can like a blog', function() {
      cy.get('button').contains('show form').click()
      cy.get('.title').type('Cypress title')
      cy.get('.author').type('Cypress author')
      cy.get('.url').type('https://www.google.com')
      cy.get('#blogform').click()
      cy.get('#bloglist').contains('Cypress title').parent().contains('view').click()
      cy.get('#bloglist').contains('Cypress title').parent().get('.likebtn').click()
      cy.get('#bloglist').contains('Cypress title').parent().get('.likesval').contains('1')
    })

    it('User can delete his own blog', function() {
      cy.get('button').contains('show form').click()
      cy.get('.title').type('Cypress title')
      cy.get('.author').type('Cypress author')
      cy.get('.url').type('https://www.google.com')
      cy.get('#blogform').click()
      cy.get('#bloglist').contains('Cypress title').parent().contains('view').click()
      cy.get('#bloglist').contains('Cypress title').parent().contains('remove').click()
    })  
    
    it('blogs are ordered by likes', function() {
      cy.get('button').contains('show form').click()
      cy.get('.title').clear().type('Cypress title')
      cy.get('.author').clear().type('Cypress author')
      cy.get('.url').clear().type('https://www.google.com')
      cy.get('#blogform').click()
      cy.get('#bloglist').contains('Cypress title').parent().contains('view').click()
      cy.get('#bloglist').contains('Cypress title').parent().find('.likebtn').click()

      cy.get('.title').clear().type('Cypress title 2')
      cy.get('.author').clear().type('Cypress author 2')
      cy.get('.url').clear().type('https://www.google2.com')
      cy.get('#blogform').click()
      cy.get('#bloglist').contains('Cypress title 2').parent().contains('view').click()
      for(let i = 0 ; i < 2 ; i++ ) {
        cy.get('#bloglist').contains('Cypress title 2').parent().find('.likebtn').click()  
        cy.wait(500)    
      }

      cy.get('.title').clear().type('Cypress title 3')
      cy.get('.author').clear().type('Cypress author 3')
      cy.get('.url').clear().type('https://www.google3.com')
      cy.get('#blogform').click()
      cy.get('#bloglist').contains('Cypress title 3').parent().contains('view').click()
      for(let i = 0 ; i < 3 ; i++ ) {
        cy.get('#bloglist').contains('Cypress title 3').parent().find('.likebtn').click()
        cy.wait(500)        
      }      

      cy.get('#bloglist .blogout .likesval').then(blogitem => {
        cy.wrap(blogitem[0]).should('contain', 3)
        cy.wrap(blogitem[1]).should('contain', 2)
        cy.wrap(blogitem[2]).should('contain', 1)
      })
    })      
  })  
})