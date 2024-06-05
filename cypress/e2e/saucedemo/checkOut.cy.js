const Credentials = require('../../credentials');
const LoginPage = require('../../pages/loginPage');

describe("Checkout (Test Suite)", () => {
    beforeEach(() => {
        // Visit the page https://www.saucedemo.com/
        cy.visit('/');
        // Use LoginPage class to login with valid credentials
        LoginPage.login(Credentials.validUser.username, Credentials.validUser.password);
        // Add an item to the cart and navigate to checkout page
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_link').click();
        cy.get('#checkout').click();
    });

    //-------------------------------------------------------------------------------------------------------
    it('Validate checkout process with valid information', () => {
        // Use valid user credentials from Credentials class
        const { firstName, lastName, postalCode } = Credentials.validUser;
        
        // Enter checkout information
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#postal-code').type(postalCode);
        // Click continue
        cy.get('#continue').click();
        // Validate navigation to checkout-step-two.html
        cy.url().should('include', '/checkout-step-two.html');
    });

    //-------------------------------------------------------------------------------------------------------
    it('Validate error message on missing first name', () => {
        const { lastName, postalCode } = Credentials.validUser;
        
        // Enter last name and postal code only
        cy.get('#last-name').type(lastName);
        cy.get('#postal-code').type(postalCode);
        // Click continue
        cy.get('#continue').click();
        // Validate error message
        cy.get('.error-message-container').should('be.visible')
            .and('contain', 'Error: First Name is required');
    });

    //-------------------------------------------------------------------------------------------------------
    it('Validate error message on missing last name', () => {
        const { firstName, postalCode } = Credentials.validUser;
        
        // Enter first name and postal code only
        cy.get('#first-name').type(firstName);
        cy.get('#postal-code').type(postalCode);
        // Click continue
        cy.get('#continue').click();
        // Validate error message
        cy.get('.error-message-container').should('be.visible')
            .and('contain', 'Error: Last Name is required');
    });

    //-------------------------------------------------------------------------------------------------------
    it('Validate error message on missing postal code', () => {
        const { firstName, lastName } = Credentials.validUser;
        
        // Enter first name and last name only
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        // Click continue
        cy.get('#continue').click();
        // Validate error message
        cy.get('.error-message-container').should('be.visible')
            .and('contain', 'Error: Postal Code is required');
    });
});