const express = require('express');
const router = express.Router();
const loginControlador = require('../controladores/loginControlador');

// Ruta para manejar el inicio de sesión desde el formulario de 'login.html' (redirige a index.html tras autenticación)
router.post('/autenticacion', (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
    }

    loginControlador.autenticarCliente(correo, contrasena, (err, cliente) => {
        if (err) {
            console.error('Error autenticando cliente:', err);
            return res.status(500).json({ message: 'Error en el servidor.' });
        }
        if (!cliente) {
            return res.redirect('/login'); // Si falla la autenticación, redirige a login.html
        }

        // Si la autenticación es exitosa, guardamos los datos del cliente en la sesión
        req.session.usuario = {
            clienteId: cliente.clienteId,
            nombres: cliente.nombres,
            correo: cliente.correo,
            rol: cliente.rol // Asegúrate de que el modelo "cliente" tenga la columna 'rol'
        };

        // Redirigir según el rol
        if (cliente.rol === 'administrador') {
            return res.redirect('/admin-dashboard.html'); // Redirige al panel del administrador
        } else {
            return res.redirect('/index.html'); // Redirige a la página principal del cliente
        }
    });
});

// Ruta para manejar el inicio de sesión desde el formulario de 'loginn.html' (redirige a reservas.html tras autenticación)
router.post('/autenticacion-loginn', (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
    }

    loginControlador.autenticarCliente(correo, contrasena, (err, cliente) => {
        if (err) {
            console.error('Error autenticando cliente:', err);
            return res.status(500).json({ message: 'Error en el servidor.' });
        }
        if (!cliente) {
            return res.redirect('/loginn'); // Si falla la autenticación, redirige a loginn.html
        }

        // Si la autenticación es exitosa, guardamos los datos del cliente en la sesión
        req.session.usuario = {
            clienteId: cliente.clienteId,
            nombres: cliente.nombres,
            correo: cliente.correo,
            rol: cliente.rol // Asegúrate de que el modelo "cliente" tenga la columna 'rol'
        };

        // Redirigir según el rol
        if (cliente.rol === 'administrador') {
            return res.redirect('/admin-dashboard.html'); // Redirige al panel del administrador
        } else {
            return res.redirect('/reservas.html'); // Redirige a la página de reservas del cliente
        }
    });
});

// Ruta para devolver la información del usuario autenticado
router.get('/api/usuario-sesion', (req, res) => {
    if (req.session.usuario) {
        // Si el usuario está autenticado, enviar sus datos
        res.json({ usuario: req.session.usuario });
    } else {
        // Si no hay usuario en la sesión, enviar null
        res.json({ usuario: null });
    }
});

// Ruta para manejar el inicio de sesión desde cualquier formulario genérico
router.post('/autenticar', loginControlador.iniciarSesion);

module.exports = router;
