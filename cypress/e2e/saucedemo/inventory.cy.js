describe("Inventario (Test Suite)", () => {
    beforeEach(() => {
      // Visitar la página https://www.saucedemo.com/
      cy.visit('/');
      // Ingresar credenciales válidas en los elementos de usuario y contraseña
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
    });
  
    //-------------------------------------------------------------------------------------------------------
    it('Validar el número de resultados', () => {
      // Validar que el número de productos mostrados es igual a 6
      cy.get('.inventory_item').should('have.length', 6);
    });
    
    //-------------------------------------------------------------------------------------------------------
    it('Incremento del valor del carrito', () => {
      // Agregar al carrito el producto Sauce Labs Bolt T-Shirt
      cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click();
      // Validamos que en el icono del carrito se ha agregado el valor 1
      cy.get('.shopping_cart_badge').should('contain', '1');
    });
  
    //-------------------------------------------------------------------------------------------------------
    it('Visibilidad del botón Eliminar producto del carrito', () => {
      // Agregar al carrito el producto Sauce Labs Onesie
      cy.get('#add-to-cart-sauce-labs-onesie').click();
      // Validamos que, al agregar el producto, se visualiza el botón REMOVE
      cy.get('.shopping_cart_badge').click();
      cy.get('#remove-sauce-labs-onesie').should('be.visible');
    });
  
    //-------------------------------------------------------------------------------------------------------
    it('Eliminar producto del carrito', () => {
      // Agregar al carrito el producto Sauce Labs Onesie
      cy.get('#add-to-cart-sauce-labs-onesie').click();
      // Eliminar producto del carrito
      cy.get('.shopping_cart_badge').click();
      cy.get('#remove-sauce-labs-onesie').click();
      // Validar que en el icono del carrito se ha eliminado el producto
      cy.get('.shopping_cart_badge').should('not.exist');
    });
});

