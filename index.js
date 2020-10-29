const instancia1 = new Vue({
    el:'#cuerpo',

    data: {
        // esta es la lista de las facturas que se recuperan
        lista_completa:[],

        // estos son los valores de los importes para buscar
        importemenor: null,
        importemayor: null,
        // estos son los valores de los inputs
        idfactura:'',
        producto:'',
        cliente:'',
        iva:null,
        cantidad:null,
        subtotal:null,
        total:null,
        formapago:'',
        // para mostrar los botones habilitados o deshabilitados
        editando:false,
        agregando:false,
        eliminando:false,
        buscando:false,
        agregar:false,
         // estos son los valores del cuadro de búsqueda
        busqueda:'',
        busqueda2:'',
        // para las casillas de opción
        busfactura:true,
        buscliente:false,
        busproducto:false,
        busimportes:false,
        // hay que descomentar la ip que se esté usando y comentar las otras
        // ipactual:'localhost',
        // ipactual:'172.16.8.7',
        ipactual:'192.168.10.104',
        // ipactual:'192.168.0.189',
    },

    methods:{
        // listar todas las facturas
        listarFacturas(){
            axios.get('http://' + this.ipactual + ':3000/obtfacturas').then(resultado => {
                this.lista_completa = resultado.data;
            });
            this.buscando = false;
            this.editando = false;
            this.agregando = false;
            this.agregar = false;
            this.buscando = false;
        },

        // eliminar una factura
        eliminarFactura(codigo){
            axios.delete('http://' + this.ipactual + ':3000/elifactura/' + codigo).then(resultado => {
                this.listarFacturas();
            });
        },

        // agregar una factura
        agregarFactura(){
            let datosfactura = {
                nombre_producto: this.producto,
                nombre_cliente: this.cliente,
                iva: this.iva,
                cantidad: this.cantidad,
                subtotal: this.subtotal,
                total: this.total,
                forma_pago: this.formapago,
            }
            axios.post('http://' + this.ipactual + ':3000/agrfactura',datosfactura).then( resultado =>{
                this.listarFacturas();
            });
            this.borrarEntradas();
        },

        // guarda los datos modificados
        actualizarFactura(){
            let id = this.idfactura;
            let datosfactura = {
                nombre_producto: this.producto,
                nombre_cliente: this.cliente,
                iva: this.iva,
                cantidad: this.cantidad,
                subtotal: this.subtotal,
                total: this.total,
                forma_pago: this.formapago,
            }
            axios.put('http://' + this.ipactual + ':3000/actfactura/' + id,datosfactura).then( resultado =>{
                this.listarFacturas();
            });
            this.editando = false;
            this.agregar = false;
            this.borrarEntradas();
        },

        // carga los valores seleccionados en las entradas
        editarFactura(indice){
            factura = this.lista_completa[indice];
            this.idfactura = factura.id_factura;
            this.producto = factura.nombre_producto;
            this.cliente = factura.nombre_cliente;
            this.iva = factura.iva;
            this.cantidad = factura.cantidad;
            this.subtotal = factura.subtotal;
            this.total = factura.total;
            this.formapago = factura.forma_pago;
        },

        // buscar una factura por id_factura
        buscarPorId(){
            idfactura = this.busqueda;
            axios.get('http://' + this.ipactual + ':3000/obtfacturaid/' + idfactura).then(resultado => {
                this.lista_completa = resultado.data;
            });
            this.busqueda = '';
        },

        // buscar una factura por cliente
        buscarPorCliente(){
            nombre = this.busqueda;
            axios.get('http://' + this.ipactual + ':3000/obtfacturacli/' + nombre).then(resultado => {
                this.lista_completa = resultado.data;
            });
            this.busqueda = '';
        },

        buscarPorProducto(){
            producto = this.busqueda;
            axios.get('http://' + this.ipactual + ':3000/obtfacturapro/' + producto).then(resultado => {
                this.lista_completa = resultado.data;
            });
            this.busqueda = '';
        },

        // buscar una factura por importe entre dos valores
        buscarPorImporte(){
            menor = this.busqueda;
            mayor = this.busqueda2;
            axios.get('http://' + this.ipactual + ':3000/obtfacturaimp/' + menor + '/' + mayor).then(resultado => {
                this.lista_completa = resultado.data;
            });
            this.busqueda = null;
            this.busqueda2 = null;
        },

        borrarEntradas(){
            this.producto = '';
            this.cliente = '';
            this.iva = null;
            this.cantidad = null;
            this.subtotal = null;
            this.total = null;
            this.formapago = '';
        },

        seleccionar(seleccion,indice){
            // esto habilita o deshabilita los cuadros
            
            this.buscando = false;
            this.editando = false;
            this.agregando = false;
            this.agregar = false;

            switch (seleccion) {
                case 'buscar':
                    this.buscando = true;
                    break;
                case 'eliminar':
                    //this.eliminando = true;
                    break;
                case 'editar':
                    this.idfactura = indice;
                    this.editarFactura(indice);
                    this.agregar = true;
                    this.editando = true;
                    break;
                case 'agregar':
                    this.borrarEntradas();
                    this.agregando = true;
                    this.agregar = true;
                    break;
                default:
            
            }
        },

        seleccionarCheckbox(valor){
            
            this.buscliente = false;
            this.busfactura = false;
            this.busimportes = false;
            this.busproducto = false;

            switch (valor) {
                case 'fact':
                    this.busfactura = true;
                    this.buscarPorId();
                    break;
                case 'clie':
                    this.buscliente = true;
                    this.buscarPorCliente();
                    break;
                case 'prod':
                    this.busproducto = true;
                    this.buscarPorProducto();
                    break;
                case 'impo':
                    this.busimportes = true;
                    this.buscarPorImporte();
                    break;
                default:
            }
        },

    },

    computed: {

        calcularTotal: function(){
            var totallocal = parseInt(this.subtotal) * parseInt(this.cantidad);
            if (!isNaN(totallocal)){
                this.total = totallocal;
                return totallocal;
            }
        },
    },

    created: function(){
        // refresca la grilla de facturas
        this.listarFacturas();
    },

});

document.addEventListener('click', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {direction: 'right'});
});

document.addEventListener('click', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {position: 'top'});
});

const escucha = io('http://' + ipactual + ':3000');
escucha.on('datos', (valor) => {
    $("#receptor").html(valor);
});