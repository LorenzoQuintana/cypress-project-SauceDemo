describe("Inventory (Test Suite)", () => {
  beforeEach(() => {
    // Visit the page https://www.saucedemo.com/
    cy.visit('/');
    // Enter valid credentials in the username and password elements
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  //-------------------------------------------------------------------------------------------------------
  it('Validate the number of results', () => {
    // Validate that the number of products displayed is equal to 6
    cy.get('.inventory_item').should('have.length', 6);
  });
  
  //-------------------------------------------------------------------------------------------------------
  it('Increase cart value', () => {
    // Add the Sauce Labs Bolt T-Shirt product to the cart
    cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click();
    // Validate that the cart icon has incremented to 1
    cy.get('.shopping_cart_badge').should('contain', '1');
  });

  //-------------------------------------------------------------------------------------------------------
  it('Visibility of the Remove product from cart button', () => {
    // Add the Sauce Labs Onesie product to the cart
    cy.get('#add-to-cart-sauce-labs-onesie').click();
    // Validate that, upon adding the product, the REMOVE button is visible
    cy.get('.shopping_cart_badge').click();
    cy.get('#remove-sauce-labs-onesie').should('be.visible');
  });

  //-------------------------------------------------------------------------------------------------------
  it('Remove product from cart', () => {
    // Add the Sauce Labs Onesie product to the cart
    cy.get('#add-to-cart-sauce-labs-onesie').click();
    // Remove the product from the cart
    cy.get('.shopping_cart_badge').click();
    cy.get('#remove-sauce-labs-onesie').click();
    // Validate that the product has been removed from the cart icon
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});

