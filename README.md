Pruebas Cypress para Sauce Demo

Este repositorio contiene pruebas automatizadas utilizando Cypress para la aplicación web Sauce Demo.


Test Suites


  - Login


   Incluye las siguientes pruebas:

    1. Validate landing URL and page title is as expected: Verifica que la URL y el título de la página sean correctos después de cargar la página de inicio.
    
    2. Validate a user can log into the page with valid credentials: Verifica que un usuario puede iniciar sesión correctamente con credenciales válidas.
    
    3. Validate a user can not log into the page with invalid credentials: Verifica que un mensaje de error se muestra cuando se intenta iniciar sesión con credenciales inválidas.
    

  - Inventario


Incluye las siguientes pruebas:

    1. Validar el número de resultados: Verifica que el número de productos mostrados en el inventario sea el esperado.
    
    2. Incremento del valor del carrito: Verifica que el valor del carrito se incrementa correctamente al agregar un producto.
    
    3. Visibilidad del botón Eliminar producto del carrito: Verifica que el botón "Remove" es visible después de agregar un producto al carrito.
    
    4. Eliminar producto del carrito: Verifica que un producto se elimina correctamente del carrito y que el icono del carrito refleja la actualización.
    
