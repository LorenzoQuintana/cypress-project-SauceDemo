const Credentials = require("../../credentials");
const ProductPrices = require("../../productPrices");
const LoginPage = require("../../pages/loginPage");

describe("Inventory (Test Suite)", () => {
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
  it("Validate the number of results", () => {
    // Validate that the number of products displayed is equal to 6
    cy.get(".inventory_item").should("have.length", 6);
  });

  //-------------------------------------------------------------------------------------------------------
  it("Increase cart value", () => {
    // Add the Sauce Labs Bolt T-Shirt product to the cart
    cy.get("#add-to-cart-sauce-labs-bolt-t-shirt").click();
    // Validate that the cart icon has incremented to 1
    cy.get(".shopping_cart_badge").should("contain", "1");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Visibility of the Remove product from cart button", () => {
    // Add the Sauce Labs Onesie product to the cart
    cy.get("#add-to-cart-sauce-labs-onesie").click();
    // Validate that, upon adding the product, the REMOVE button is visible
    cy.get(".shopping_cart_badge").click();
    cy.get("#remove-sauce-labs-onesie").should("be.visible");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Remove product from cart", () => {
    // Add the Sauce Labs Onesie product to the cart
    cy.get("#add-to-cart-sauce-labs-onesie").click();
    // Remove the product from the cart
    cy.get(".shopping_cart_badge").click();
    cy.get("#remove-sauce-labs-onesie").click();
    // Validate that the product has been removed from the cart icon
    cy.get(".shopping_cart_badge").should("not.exist");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Sort products by price (low to high)", () => {
    // Sort products by price (low to high)
    cy.get(".product_sort_container").select("lohi");
    // Validate the first product is the cheapest
    cy.get(".inventory_item_price")
      .first()
      .should("contain", ProductPrices.productPrices.lowestPrice);
  });

  //-------------------------------------------------------------------------------------------------------
  it("Sort products by price (high to low)", () => {
    // Sort products by price (high to low)
    cy.get(".product_sort_container").select("hilo");
    // Validate the first product is the most expensive
    cy.get(".inventory_item_price")
      .first()
      .should("contain", ProductPrices.productPrices.highestPrice);
  });

  //-------------------------------------------------------------------------------------------------------
  it("Validate product details page navigation", () => {
    // Click on the first product's name
    cy.get(".inventory_item_name").first().click();
    // Validate the URL includes /inventory-item.html
    cy.url().should("include", "/inventory-item.html");
    // Validate the presence of the product details
    cy.get(".inventory_details").should("be.visible");
  });
});
