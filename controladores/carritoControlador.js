// carritoControlador.js
import Carrito from './carritoModelo.js';

class CarritoControlador {
    constructor() {
        this.carrito = new Carrito();
    }

    agregarAlCarrito(nombreProducto) {
        this.carrito.agregarProducto(nombreProducto);
        this.actualizarVistaCarrito();
        this.actualizarFormularioCotizacion(nombreProducto);
    }

    actualizarVistaCarrito() {
        const carritoElement = document.getElementById('carrito');
        carritoElement.innerHTML = ''; // Limpiar el carrito visual
        const productos = this.carrito.obtenerProductos();
        productos.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = producto;
            carritoElement.appendChild(li);
        });
    }

    actualizarFormularioCotizacion(evento) {
        const totalAmountElement = document.getElementById('total-amount');
        const costoEvento = 100; // Ejemplo de costo por evento
        let totalActual = parseInt(document.getElementById('total').value) || 0;
        totalActual += costoEvento; // Sumar el costo del evento
        document.getElementById('total').value = totalActual; // Actualizar el valor oculto
        totalAmountElement.textContent = `Total: $${totalActual} COP`; // Actualizar el texto mostrado
    }

    // Otros métodos según sea necesario...
}

const carritoControlador = new CarritoControlador();
export default carritoControlador; // Exportamos la instancia del controlador
