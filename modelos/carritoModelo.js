// carritoModelo.js
class Carrito {
    constructor() {
        this.items = [];
    }

    agregarProducto(producto) {
        this.items.push(producto);
    }

    obtenerProductos() {
        return this.items;
    }

    vaciarCarrito() {
        this.items = [];
    }
}

export default Carrito; // Exportamos la clase para usarla en el controlador