const express = require('express');
const path = require('path');
const router = express.Router();
const cotizarControlador = require('../controladores/cotizarControlador');

// Middleware para verificar autenticación
const verificarAutenticacion = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect('/login'); // Redirige si el usuario no está autenticado
    }
    next(); // Continúa si el usuario está autenticado
};

// Ruta para mostrar la página de cotizar
router.get('/', verificarAutenticacion, (req, res) => {
    res.sendFile(path.join(__dirname, '../vistas', 'cotizar.html')); 
});

// Ruta para manejar la creación de cotizaciones
router.post('/', verificarAutenticacion, async (req, res) => {
    try {
        await cotizarControlador.crearCotizacion(req);
        // Redirigir a una página de éxito o confirmación después de crear la cotización
        return res.redirect('/index.html'); // Cambia esta ruta según tu estructura
    } catch (error) {
        console.error('Error en la ruta de cotización:', error);
        if (error.message === 'Ya existe una cotización para esta fecha.') {
            return res.status(400).json({ message: error.message }); // Puedes seguir manejando errores aquí si es necesario
        }
        return res.status(500).json({ message: 'Error al crear la cotización', error: error.message });
    }
});

// Ruta para obtener el clienteId del usuario autenticado
router.get('/clienteId', verificarAutenticacion, (req, res) => {
    console.log('Usuario en sesión:', req.session.usuario);
    res.json({ clienteId: req.session.usuario.clienteId }); // Envía el clienteId
});

module.exports = router;
