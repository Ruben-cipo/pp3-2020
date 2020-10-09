/* cargar las funcionalidades del conector de node
a las bases de datos mysql en una constante */
const mysql = require('mysql');

/* definir otra constante con las credenciales de conexión
a la base de datos mysql que queramos conectar */
const conexion = mysql.createConnection({
	host:'localhost',
	user:'ruben',
	password:'ruben',
	database:'vue_api_db'
});

// generar una conexión a esa base de datos
conexion.connect();

/* en desarrollo podemos chequear que la conexion sea correcta
por el momento solo enviamos un mensaje que pasamos por aqui */
console.log('conectando ...');

// exportamos la conexion para poder usarla en otro lugar del proyecto
module.exports = conexion;
