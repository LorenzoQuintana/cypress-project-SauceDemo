const Credentials = require('../../credentials');
const ErrorMessages = require('../../errorMessages');
const SampleProduct = require('../../sampleProduct');
const LoginPage = require('../../pages/loginPage');
const CheckoutPage = require('../../pages/checkoutPage');
const CartPage = require('../../pages/cartPage');

describe("Checkout (Test Suite)", () => {
  beforeEach(() => {
    // Visit the page https://www.saucedemo.com/
    cy.visit('/');
    // Use LoginPage class to login with valid credentials
    LoginPage.login(Credentials.validUser.username, Credentials.validUser.password);
    // Add an item to the cart and navigate to checkout page
    CartPage.addItemToCart("addToCartItem1Button");
    CartPage.navigateToCart();
    CartPage.proceedToCheckout();
  });

  //-------------------------------------------------------------------------------------------------------
  it('Validate checkout process with valid information', () => {
    // Use valid user credentials from Credentials class
    const { firstName, lastName, postalCode } = Credentials.validUser;
    
    // Enter checkout information
    CheckoutPage.enterCheckoutInformation(firstName, lastName, postalCode);
    // Click continue
    CheckoutPage.continueCheckout();
    // Validate navigation to checkout-step-two.html
    cy.url().should('include', '/checkout-step-two.html');
  });

  //-------------------------------------------------------------------------------------------------------
  it('Validate error message on missing first name', () => {
    const { lastName, postalCode } = Credentials.validUser;
    
    // Enter last name and postal code only
    CheckoutPage.enterCheckoutInformation(null, lastName, postalCode);
    // Click continue
    CheckoutPage.continueCheckout();
    // Validate error message
    CheckoutPage.elements.errorMessage().should('be.visible')
        .and('contain', ErrorMessages.sampleMessages.FirstNameRequired);
  });

  //-------------------------------------------------------------------------------------------------------
  it('Validate error message on missing last name', () => {
    const { firstName, postalCode } = Credentials.validUser;
    
    // Enter first name and postal code only
    CheckoutPage.enterCheckoutInformation(firstName, null, postalCode);
    // Click continue
    CheckoutPage.continueCheckout();
    // Validate error message
    CheckoutPage.elements.errorMessage().should('be.visible')
        .and('contain', ErrorMessages.sampleMessages.LastNameRequired);
  });

  //-------------------------------------------------------------------------------------------------------
  it('Validate error message on missing postal code', () => {
    const { firstName, lastName } = Credentials.validUser;
    
    // Enter first name and last name only
    CheckoutPage.enterCheckoutInformation(firstName, lastName, null);
    // Click continue
    CheckoutPage.continueCheckout();
    // Validate error message
    CheckoutPage.elements.errorMessage().should('be.visible')
        .and('contain', ErrorMessages.sampleMessages.PCRequired);
  });
});
