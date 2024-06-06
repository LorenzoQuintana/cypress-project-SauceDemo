const Credentials = require('../../credentials');
const SampleProduct = require('../../sampleProduct');
const LoginPage = require('../../pages/loginPage');
const InventoryPage = require('../../pages/inventoryPage');

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
    InventoryPage.elements.inventoryItems().should("have.length", 6);
  });

  //-------------------------------------------------------------------------------------------------------
  it("Increase cart value", () => {
    // Add the Sauce Labs Bolt T-Shirt product to the cart
    InventoryPage.addItemToCart("addToCartItem1Button");
    // Validate that the cart icon has incremented to 1
    InventoryPage.elements.cartBadge().should("contain", "1");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Visibility of the Remove product from cart button", () => {
    // Add the Sauce Labs Onesie product to the cart
    InventoryPage.addItemToCart("addToCartItem2Button");
    // Validate that, upon adding the product, the REMOVE button is visible
    InventoryPage.goToCart();
    InventoryPage.elements.removeItem2Button().should("be.visible");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Remove product from cart", () => {
    // Add the Sauce Labs Onesie product to the cart
    InventoryPage.addItemToCart("addToCartItem2Button");
    // Remove the product from the cart
    InventoryPage.removeItemFromCart("removeItem2Button");
    // Validate that the product has been removed from the cart icon
    InventoryPage.elements.cartBadge().should("not.exist");
  });

  //-------------------------------------------------------------------------------------------------------
  it("Sort products by price (low to high)", () => {
    // Sort products by price (low to high)
    InventoryPage.sortItems("lohi");
    // Validate the first product is the cheapest
    InventoryPage.elements.firstItemPrice().should("contain", SampleProduct.validPrices.lowestPrice);
  });

  //-------------------------------------------------------------------------------------------------------
  it("Sort products by price (high to low)", () => {
    // Sort products by price (high to low)
    InventoryPage.sortItems("hilo");
    // Validate the first product is the most expensive
    InventoryPage.elements.firstItemPrice().should("contain", SampleProduct.validPrices.highestPrice);
  });

  //-------------------------------------------------------------------------------------------------------
  it("Validate product details page navigation", () => {
    // Click on the first product's name
    InventoryPage.elements.firstItemName().click();
    // Validate the URL includes /inventory-item.html
    cy.url().should("include", "/inventory-item.html");
    // Validate the presence of the product details
    InventoryPage.elements.productDetails().should("be.visible");
  });
});
