class CheckoutPage {
    elements = {
      firstNameInput: () => cy.get('#first-name'),
      lastNameInput: () => cy.get('#last-name'),
      postalCodeInput: () => cy.get('#postal-code'),
      continueButton: () => cy.get('#continue'),
      errorMessage: () => cy.get('.error-message-container'),
    };
  
    enterCheckoutInformation(firstName, lastName, postalCode) {
      if (firstName) this.elements.firstNameInput().type(firstName);
      if (lastName) this.elements.lastNameInput().type(lastName);
      if (postalCode) this.elements.postalCodeInput().type(postalCode);
    }
  
    continueCheckout() {
      this.elements.continueButton().click();
    }
  }
  
  module.exports = new CheckoutPage();