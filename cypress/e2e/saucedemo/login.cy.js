describe("Login (Test Suite)", () => {
    beforeEach(() => {
      // Visitar la página https://www.saucedemo.com/
      cy.visit('/');
    });
  
    //-------------------------------------------------------------------------------------------------------
    it('Validate landing URL and page title is as expected', () => {
      // Validar que la URL es la misma a la que pedimos navegar
      cy.url().should('eq', Cypress.config().baseUrl);
  
      // Validar que el título de la página sea “Swag Labs”
      cy.title().should('eq', 'Swag Labs');
    });
    

    //-------------------------------------------------------------------------------------------------------
    it('Validate a user can log into the page with valid credentials', () => {
      // Ingresar credenciales válidas en los elementos de usuario y contraseña
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
  
      // Validar que el usuario ingresa correctamente (URL y Título)
      cy.url().should('include', '/inventory.html');
      cy.title().should('eq', 'Swag Labs');
    });
  

    //--------------------------------------------------------------------------------------------------------
    it('Validate a user can not log into the page with invalid credentials', () => {
      // Ingresar credenciales no válidas en los elementos de usuario y contraseña
      cy.get('#user-name').type('standard_use');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
  
      // Validar que un mensaje de error se despliega con el mensaje esperado
      cy.get('.error-message-container').should('be.visible')
        .and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });
  });