/* se guarda en una constante todo lo que nos ofrece express
como marco de trabajo */
const expressLocal = require('express');
const cors = require('cors');

// se inicializan y guardan las funcionalidades de express en otra constante
const servidor = expressLocal();

// seteamos el puerto a usar como el definido o el 3000 en su defecto
servidor.set('port', process.env.PORT || 3000);

/* indicamos que el formato para recepcion y envio es JSon */
servidor.use(expressLocal.json());
servidor.use(cors());

/* cargamos nuestras rutas definidas en el archivo
   route.cliente.js */
servidor.use(require('./rutas/rutas_vue_rest'));

// le damos arranque al servidor
servidor.listen(servidor.get('port'));

// Saludamos
console.log('Servidor ejecutándose en el puerto ',servidor.get('port'));
