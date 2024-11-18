const express = require('express');
const router = express.Router();
const clientesControlador = require('../controladores/clientesControlador');
const clientesModelo = require('../modelos/clientesModelo');

// Ruta para registrarse
router.post('/registro', (req, res) => {
    const { nombres, apellidos, correo, contrasena, direccion, celular, rol } = req.body;

    // Verificar si todos los campos están completos
    if (!nombres || !apellidos || !correo || !contrasena || !direccion || !celular) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    // Validar si el rol es admin y si el usuario autenticado es un administrador
    if (rol === 'admin') {
        const clienteId = req.session.clienteId; // Supuesto de cliente autenticado
        // Verificar si el cliente autenticado es el administrador principal
        clientesModelo.obtenerClientePorId(clienteId, (err, cliente) => {
            if (err || !cliente) {
                return res.status(500).json({ message: 'Error al verificar el administrador.' });
            }

            // Verificar si el cliente autenticado es el administrador principal
            if (cliente.correo !== 'viviana123@email.com') {
                return res.status(403).json({ message: 'Solo el administrador principal puede registrar administradores.' });
            }

            // Si pasa la validación, continuar con el registro
            registrarCliente();
        });
    } else {
        // Si no es admin, proceder normalmente con el registro
        registrarCliente();
    }

    // Función que realiza el registro del cliente
    function registrarCliente() {
        // Crear el objeto cliente con los datos proporcionados y la fecha actual
        const nuevoCliente = {
            nombres,
            apellidos,
            correo,
            contrasena,
            direccion,
            celular,
            rol: rol || 'cliente',  // Si no se especifica, se asigna 'cliente'
            fechaRegistro: new Date()
        };

        // Registrar el cliente en la base de datos
        clientesModelo.registrarCliente(nuevoCliente, (err, result) => {
            if (err) {
                // Verificar si el error es por duplicación de correo
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Este correo ya está registrado.' });
                }
                console.error('Error registrando cliente:', err);
                return res.status(500).json({ message: 'Error en el servidor.' });
            }

            res.redirect('/login'); 
        });
    }
});


// Ruta para recuperar contraseña
router.post('/recuperar-contrasena', (req, res) => {
    const { correo, nueva_contrasena, repita_contrasena } = req.body;

    // Verificar que todos los campos estén completos
    if (!correo || !nueva_contrasena || !repita_contrasena) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    // Verificar que las contraseñas coincidan
    if (nueva_contrasena !== repita_contrasena) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
    }

    // Llamar a la función del modelo para actualizar la contraseña
    clientesModelo.actualizarContrasena(correo, nueva_contrasena, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor.' });
        }

        // Verificar si se actualizó alguna fila
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró un cliente con ese correo.' });
        }

        res.redirect('/login'); 
    });
});

// Ruta para obtener las reservas de un cliente
router.get('/mis-reservas', (req, res) => {
    const clienteId = req.session.clienteId; // Suponiendo que estás guardando el clienteId en la sesión

    clientesModelo.obtenerReservas(clienteId, (err, reservas) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener reservas.' });
        }
        res.json({ reservas });
    });
});

// Ruta para crear una nueva reserva
router.post('/reservas/crear', (req, res) => {
    const { personas, evento, fecha, hora, buffet, decoracion, alquiler, musica } = req.body;
    const clienteId = req.session.clienteId; // Suponiendo que estás guardando el clienteId en la sesión

    const nuevaReserva = {
        personas,
        evento,
        fecha,
        hora,
        buffet,
        decoracion,
        alquiler,
        musica,
        clienteId, // Asegúrate de agregar el ID del cliente
    };

    clientesModelo.crearReserva(nuevaReserva, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear la reserva.' });
        }
        res.status(201).json({ message: 'Reserva creada exitosamente.' });
    });
});

// Ruta para editar una reserva existente
router.put('/reservas/editar/:id', (req, res) => {
    const reservaId = req.params.id;
    const { personas, evento, fecha, hora, buffet, decoracion, alquiler, musica } = req.body;

    const reservaActualizada = {
        personas,
        evento,
        fecha,
        hora,
        buffet,
        decoracion,
        alquiler,
        musica,
    };

    clientesModelo.editarReserva(reservaId, reservaActualizada, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar la reserva.' });
        }
        res.json({ message: 'Reserva actualizada exitosamente.' });
    });
});

// Ruta para eliminar una reserva
router.delete('/reservas/eliminar/:id', (req, res) => {
    const reservaId = req.params.id;

    clientesModelo.eliminarReserva(reservaId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar la reserva.' });
        }
        res.json({ message: 'Reserva eliminada exitosamente.' });
    });
});

module.exports = router;
