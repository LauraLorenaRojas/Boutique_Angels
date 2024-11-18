const db = require('../config/db');
// Función para crear una nueva reserva
function crearReserva(reservaData) {
    reservaModelo.crearReserva(reservaData, (err, resultado) => {
        if (err) {
            console.error('Error al crear la reserva:', err);
            return;
        }
        iniciarContador(); // Iniciar el temporizador
        actualizarTablaReservas(); // Actualizar la tabla de reservas
    });
}

// Función para editar una reserva
function editarReserva(cotizacionId, nuevosDatos) {
    reservaModelo.obtenerReservaPorId(cotizacionId, (err, reserva) => {
        if (err) {
            console.error('Error al obtener la reserva:', err);
            return;
        }

        // Solo se permite editar la reserva recién creada
        if (reserva && reserva.estado === 'activa') {
            reservaModelo.actualizarReserva(cotizacionId, nuevosDatos, (err) => {
                if (err) {
                    console.error('Error al actualizar la reserva:', err);
                    return;
                }
                actualizarTablaReservas(); // Actualizar la tabla de reservas
            });
        }
    });
}


exports.obtenerReservasPorCliente = (clienteId, callback) => {
    const query = `SELECT * FROM cotizacion WHERE clienteId = ?`;
    
    db.query(query, [clienteId], (err, resultados) => {
        if (err) {
            return callback(err);
        }
        callback(null, resultados);
    });
};

exports.obtenerReservaPorId = (cotizacionId, callback) => {
    const query = `SELECT * FROM cotizacion WHERE cotizacionId = ?`;
    
    db.query(query, [cotizacionId], (err, resultados) => {
        if (err) {
            return callback(err);
        }
        callback(null, resultados[0]); // Retornar solo la primera reserva
    });
};

exports.actualizarReserva = (cotizacionId, datos, callback) => {
    const query = `UPDATE cotizacion SET personas = ?, evento = ?, fecha = ?, hora = ? WHERE cotizacionId = ?`;
    
    db.query(query, [datos.personas, datos.evento, datos.fecha, datos.hora, cotizacionId], (err, resultados) => {
        if (err) {
            return callback(err);
        }
        callback(null, resultados);
    });
};

exports.eliminarReserva = (cotizacionId, callback) => {
    const query = `DELETE FROM cotizacion WHERE cotizacionId = ?`;
    
    db.query(query, [cotizacionId], (err, resultados) => {
        if (err) {
            return callback(err);
        }
        callback(null, resultados);
    });
};
const reservaModelo = {
    // Desactivar la edición de todas las reservas de un cliente
    desactivarEdicionReservas: async (clienteId) => {
        const query = `UPDATE reservas SET editable = false WHERE clienteId = ?`;
        await db.query(query, [clienteId]);
    }
}