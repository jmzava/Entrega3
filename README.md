Configurar el .env

Dejo un .env-ejemplo como base
Tirar los comandos

$ npm install
$ npm start
Carpeta "application" Contiene todo el código TS

Carpeta "build" Contiene el código js y las vistas en la carpeta public

Front
Cuando el servidor está corriendo acceder a

http://localhost:8080/


Datos de la Entrega : 

para la parte de usuario tiene un front cargado donde maneja el usuario se carga el formnulario de registro y se ingresa a un faker de productos.
envia el correo con el alta de usuario segun lo pedido en la PPT

en la parte de carrito y productos se utiliza POSTMAN para la prueba de los mismos.
se deja una carpeta postman con las colecciones que se usaron para probar
para terminar la compra se utiliza la ruta en postman : "localhost:8080/api/carrito/:id/Comprar"


donde en el id se pone un id de carrito valido 


se utilizo log4js en algunas de las salidas del console.log ( no llegue a terminalos todo, se va a cambiar por winston para la entrega final y poenrlo en todas las salidas de error)