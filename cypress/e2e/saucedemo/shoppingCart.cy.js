const Credentials = require("../../credentials");
const ErrorMessages = require('../../errorMessages');
const SampleProduct = require("../../sampleProduct");
const LoginPage = require("../../pages/loginPage");
const CartPage = require("../../pages/cartPage");

describe("Cart (Test Suite)", () => {
  beforeEach(() => {
    // Visit the page https://www.saucedemo.com/
    cy.visit("/");
    // Use LoginPage class to login with valid credentials
    LoginPage.login(
      Credentials.validUser.username,
      Credentials.validUser.password
    );
  });

  //-------------------------------------------------------------------------------------------------------
  it("Validate cart is empty initially", () => {
    // Navigate to the cart page
    CartPage.navigateToCart();
    // Validate the cart is empty
    CartPage.elements.cartItems().should("not.exist");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Add item to cart and validate", () => {
    // Add the Sauce Labs Backpack product to the cart
    CartPage.addItemToCart("addToCartItem1Button");
    // Navigate to the cart page
    CartPage.navigateToCart();
    // Validate the product is in the cart
    CartPage.elements.cartItems().should("have.length", 1);
    CartPage.elements.itemName().should("contain", SampleProduct.validProduct.name);
  });

  //-------------------------------------------------------------------------------------------------------
  it("Remove item from cart and validate", () => {
    // Add the Sauce Labs Backpack product to the cart
    CartPage.addItemToCart("addToCartItem1Button");
    // Navigate to the cart page
    CartPage.navigateToCart();
    // Remove the product from the cart
    CartPage.removeItemFromCart("removeItem1Button");
    // Validate the cart is empty
    CartPage.elements.cartItems().should("not.exist");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Validate checkout process up to information page", () => {
    // Add the Sauce Labs Backpack product to the cart
    CartPage.addItemToCart("addToCartItem1Button");
    // Navigate to the cart page
    CartPage.navigateToCart();
    // Click on the checkout button
    CartPage.proceedToCheckout();
    // Validate navigation to checkout-step-one.html
    cy.url().should("include", "/checkout-step-one.html");
  });
});
