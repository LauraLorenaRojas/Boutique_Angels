const reservaModelo = require('../modelos/reservaModelo');

// Obtener reservas por clienteId
exports.obtenerReservasPorCliente = (req, res) => {
    const clienteId = req.session.usuario.clienteId;

    if (!clienteId) {
        return res.status(401).json({ message: 'Cliente no autenticado.' });
    }

    reservaModelo.obtenerReservasPorCliente(clienteId, (err, reservas) => {
        if (err) {
            console.error('Error al obtener reservas:', err);
            return res.status(500).json({ message: 'Error en el servidor.' });
        }
        return res.json({ reservas });
    });
};

// Obtener una reserva específica
exports.obtenerReservaPorId = (req, res) => {
    const cotizacionId = req.params.cotizacionId;

    reservaModelo.obtenerReservaPorId(cotizacionId, (err, reserva) => {
        if (err) {
            console.error('Error al obtener reserva:', err);
            return res.status(500).json({ message: 'Error en el servidor.' });
        }
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada.' });
        }

        const tiempoMaximoEdicion = 2 * 60 * 1000 + 30 * 1000; // 2 minutos y 30 segundos
        const tiempoTranscurrido = Date.now() - new Date(reserva.fecha_creacion).getTime();

        if (tiempoTranscurrido >= tiempoMaximoEdicion) {
            return res.status(403).json({ message: 'El tiempo de edición ha expirado.' });
        }

        return res.json({ reserva });
    });
};

// Actualizar una reserva
exports.actualizarReserva = (req, res) => {
    const cotizacionId = req.params.cotizacionId;
    const datos = req.body;

    reservaModelo.actualizarReserva(cotizacionId, datos, (err) => {
        if (err) {
            console.error('Error al actualizar reserva:', err);
            return res.status(500).json({ message: 'Error en el servidor.' });
        }
        return res.json({ success: true });
    });
};

// Eliminar una reserva
exports.eliminarReserva = (req, res) => {
    const cotizacionId = req.params.cotizacionId;

    reservaModelo.eliminarReserva(cotizacionId, (err) => {
        if (err) {
            console.error('Error al eliminar reserva:', err);
            return res.status(500).json({ message: 'Error en el servidor.' });
        }
        return res.json({ success: true });
    });
};
