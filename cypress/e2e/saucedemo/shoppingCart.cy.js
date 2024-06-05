const Credentials = require("../../credentials");
const LoginPage = require("../../pages/loginPage");

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
    cy.get(".shopping_cart_link").click();
    // Validate the cart is empty
    cy.get(".cart_item").should("not.exist");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Add item to cart and validate", () => {
    // Add the Sauce Labs Backpack product to the cart
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    // Navigate to the cart page
    cy.get(".shopping_cart_link").click();
    // Validate the product is in the cart
    cy.get(".cart_item").should("have.length", 1);
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Remove item from cart and validate", () => {
    // Add the Sauce Labs Backpack product to the cart
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    // Navigate to the cart page
    cy.get(".shopping_cart_link").click();
    // Remove the product from the cart
    cy.get("#remove-sauce-labs-backpack").click();
    // Validate the cart is empty
    cy.get(".cart_item").should("not.exist");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Validate checkout process up to information page", () => {
    // Add the Sauce Labs Backpack product to the cart
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    // Navigate to the cart page
    cy.get(".shopping_cart_link").click();
    // Click on the checkout button
    cy.get("#checkout").click();
    // Validate navigation to checkout-step-one.html
    cy.url().should("include", "/checkout-step-one.html");
  });
});
