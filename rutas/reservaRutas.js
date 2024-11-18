const express = require('express');
const router = express.Router();
const reservaControlador = require('../controladores/reservaControlador');

// Ruta para obtener las reservas del cliente autenticado
router.get('/mis-reservas', reservaControlador.obtenerReservasPorCliente);

// Ruta para obtener una reserva específica para editar
router.get('/editar/:cotizacionId', reservaControlador.obtenerReservaPorId);

// Ruta para actualizar una reserva
router.put('/editar/:cotizacionId', reservaControlador.actualizarReserva);

// Ruta para eliminar una reserva
router.delete('/eliminar/:cotizacionId', reservaControlador.eliminarReserva);

module.exports = router;