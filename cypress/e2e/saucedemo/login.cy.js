describe("Login (Test Suite)", () => {
  beforeEach(() => {
    // Visit the page https://www.saucedemo.com/
    cy.visit('/');
  });

  //-------------------------------------------------------------------------------------------------------
  it('Validate landing URL and page title is as expected', () => {
    // Validate that the URL is the same as the one we requested to navigate to
    cy.url().should('eq', Cypress.config().baseUrl);

    // Validate that the page title is “Swag Labs”
    cy.title().should('eq', 'Swag Labs');
  });
  
  //-------------------------------------------------------------------------------------------------------
  it('Validate a user can log into the page with valid credentials', () => {
    // Enter valid credentials in the username and password elements
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Validate that the user logs in successfully (URL and Title)
    cy.url().should('include', '/inventory.html');
    cy.title().should('eq', 'Swag Labs');
  });

  //--------------------------------------------------------------------------------------------------------
  it('Validate a user cannot log into the page with invalid credentials', () => {
    // Enter invalid credentials in the username and password elements
    cy.get('#user-name').type('standard_use');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Validate that an error message is displayed with the expected message
    cy.get('.error-message-container').should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });
});