class InventoryPage {
    elements = {
      inventoryItems: () => cy.get(".inventory_item"),
      addToCartItem1Button: () => cy.get("#add-to-cart-sauce-labs-bolt-t-shirt"),
      addToCartItem2Button: () => cy.get("#add-to-cart-sauce-labs-onesie"),
      removeItem2Button: () => cy.get("#remove-sauce-labs-onesie"),
      cartBadge: () => cy.get(".shopping_cart_badge"),
      cartLink: () => cy.get(".shopping_cart_link"),
      checkoutButton: () => cy.get("#checkout"),
      sortDropdown: () => cy.get(".product_sort_container"),
      firstItemPrice: () => cy.get(".inventory_item_price").first(),
      firstItemName: () => cy.get(".inventory_item_name").first(),
      productDetails: () => cy.get(".inventory_details"),
    };
  
    addItemToCart(item) {
      this.elements[item]().click();
    }
  
    removeItemFromCart(item) {
      this.elements.cartBadge().click();
      this.elements[item]().click();
    }
  
    goToCart() {
      this.elements.cartLink().click();
    }
  
    goToCheckout() {
      this.elements.checkoutButton().click();
    }
  
    sortItems(order) {
      this.elements.sortDropdown().select(order);
    }
  }
  
  module.exports = new InventoryPage();