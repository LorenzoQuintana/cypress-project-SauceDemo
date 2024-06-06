class CartPage {
    elements = {
      cartLink: () => cy.get(".shopping_cart_link"),
      cartItems: () => cy.get(".cart_item"),
      addToCartItem1Button: () => cy.get("#add-to-cart-sauce-labs-backpack"),
      removeItem1Button: () => cy.get("#remove-sauce-labs-backpack"),
      checkoutButton: () => cy.get("#checkout"),
      itemName: () => cy.get(".inventory_item_name"),
    };
  
    navigateToCart() {
      this.elements.cartLink().click();
    }
  
    addItemToCart(item) {
      this.elements[item]().click();
    }
  
    removeItemFromCart(item) {
      this.elements[item]().click();
    }
  
    proceedToCheckout() {
      this.elements.checkoutButton().click();
    }
  }
  
  module.exports = new CartPage();