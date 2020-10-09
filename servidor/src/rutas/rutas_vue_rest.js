// nuevamente creamos una instancia de express
const expressLocal = require('express');

// cargamos en la constante router una instancia de Router de express
const router = expressLocal.Router();

// cargamos en la constante basedatos el modulo database.js
const basedatos = require('../database');

/********	READ	*********
ruta para obtener todos las facturas cargadas	*/
router.get('/obtfacturas', (solicitud,respuesta) => {

	basedatos.query('select * from factura', (error,filas) => {
		if(!error) {
			respuesta.json(filas);
		} else {
			respuesta.json('Hubo un error al obtener la lista de facturas');
		}
	});
});

/********	READ	*********
ruta para obtener una sola factura por id de factura	*/
router.get('/obtfacturaid/:id', (solicitud,respuesta) => {

	const idFactura = solicitud.params.id;
	basedatos.query('select * from factura where id_factura = ?',[idFactura], (error,filas) => {
		if(!error) {
			respuesta.json(filas);
		} else {
			respuesta.json('Hubo un error al obtener la factura');
		}
	});
});

/********	READ	*********
ruta para obtener facturas por nombre de producto  */
router.get('/obtfacturanom/:nombre', (solicitud,respuesta) => {

        const nomProducto= solicitud.params.nombre;
        basedatos.query("select * from factura where nombre_producto like '%" + nomProducto + "%'", (error,filas) => {
                if(!error) {
                        respuesta.json(filas);
                } else {
                        respuesta.json('Hubo un error al obtener la lista de facturas');
                }
        });
});

/********	READ	*********
ruta para obtener facturas por importes */
router.get('/obtfacturaimp/:importe1/:importe2', (solicitud,respuesta) => {

        const imp1= parseInt(solicitud.params.importe1);
        const imp2= parseInt(solicitud.params.importe2);
        basedatos.query("select * from factura where total between ? and ?",[imp1,imp2], (error,filas) => {
                if(!error) {
                        respuesta.json(filas);
                } else {
                        respuesta.json(error);
                }
        });
});

/********	READ	*********
ruta para obtener facturas por nombre de cliente */
router.get('/obtfacturacli/:cliente', (solicitud,respuesta) => {

        const cliente = solicitud.params.cliente;
        basedatos.query("select * from factura where nombre_cliente like '%" + cliente + "%'", (error,filas) => {
                if(!error) {
                        respuesta.json(filas);
                } else {
                        respuesta.json('Hubo un error al obtener las facturas');
                }
        });
});

/*******	DELETE	*********
ruta para eliminar una factura	*/
router.delete('/elifactura/:id', (solicitud,respuesta) => {

	const idFactura = solicitud.params.id;
	basedatos.query('delete from factura where id_factura = ?', [idFactura], (error,filas) => {
		if(!error) {
			respuesta.json(filas);
		} else {
			respuesta.json('Hubo un error al eliminar la factura');
		}
	});
});

/********	CREATE	*********
ruta para agregar una factura */
router.post('/agrfactura', (solicitud,respuesta) => {

	const datos = solicitud.body;
	basedatos.query('insert into factura set ?',[datos], (error,filas) => {
		if(!error) {
			respuesta.json(filas);
		} else {
			respuesta.json('Hubo un error al agregar la factura');
		}
	});
});

/********	UPDATE	*********
ruta para actualizar una factura*/
router.put('/actfactura/:id', (solicitud,respuesta) => {

	const idFactura = solicitud.params.id;
	const datos = solicitud.body;

	basedatos.query('update factura set ? where id_factura = ?',[datos, idFactura], (error,filas) => {
		if(!error) {
			respuesta.json(filas);
		} else {
			respuesta.json('Hubo un error al actualizar la factura');
		}
	});
});

/* exportamos el módulo para utilizarlo en donde se requiera */
module.exports = router;
