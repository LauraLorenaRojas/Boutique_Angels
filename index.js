const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const { PORT } = require('./config/config.js');


const app = express();
const port = 3008; // Cambié el puerto a 3005 para evitar conflictos

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuración para el análisis del cuerpo de las solicitudes (formularios)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
    secret: 'tu-secreto-aqui', // Cambia este valor por uno más seguro
    resave: false,
    saveUninitialized: true
}));

// Configuración adicional para servir archivos HTML desde la carpeta 'vistas'
app.use(express.static(path.join(__dirname, 'vistas')));

// Importar Rutas
const clientesRutas = require('./rutas/clientesRutas');
const reservaRutas = require('./rutas/reservaRutas'); 
const loginRutas = require('./rutas/loginRutas'); 
const cotizarRutas = require('./rutas/cotizarRutas');


// Middleware para verificar si el usuario está autenticado
const verificarAutenticacion = (req, res, next) => {
    if (req.session.usuario) {
        return next(); // El usuario está autenticado, continuar con la siguiente función
    } else {
        res.redirect('/login'); // Si no está autenticado, redirigir a la página de login
    }
};

// Usar las rutas
app.use('/clientes', clientesRutas);
app.use('/reservar', reservaRutas); // Añadido para rutas de reserva
app.use('/login', loginRutas);
app.use('/cotizar', cotizarRutas);

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'login.html'));
});

app.get('/cotizar', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'cotizar.html'));
});

app.get('/loginn', (req, res) => { 
    res.sendFile(path.join(__dirname, 'vistas', 'loginn.html')); 
    
});

app.get('/eventos', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'eventos.html'));
});

app.get('/baby', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'baby.html'));
});

app.get('/bodas', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'bodas.html'));
});

app.get('/catering', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'catering.html'));
});


app.get('/pcomunion', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'pcomunion.html'));
});

app.get('/prom', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'prom.html'));
});

app.get('/quince', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'quince.html'));
});

app.get('/servicios', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'servicios.html'));
});

app.get('/sonido', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'sonido.html'));
});

app.get('/vestidosbodas', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'vestidosbodas.html'));
});

app.get('/vestidosbaby', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'vestidosbaby.html'));
});


app.get('/vestidospcomunion', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'vestidospcomunion.html'));
});


app.get('/vestidosprom', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'vestidosprom.html'));
});


app.get('/vestidosquince', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'vestidosquince.html'));
});


app.get('/decoracionbaby', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'decoracionbaby.html'));
});


app.get('/decoracionbodas', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'decoracionpcomuni.html'));
});


app.get('/decoracionprom', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'decoracionprom.html'));
});


app.get('/decoracionxv', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'decoracionxv.html'));
});

app.get('/decoracionpcomuni', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'decoracionpcomuni.html'));
});

// Nueva ruta para cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/'); 
    });
});

// Nueva ruta /session-info para obtener la información de la sesión
app.get('/session-info', (req, res) => {
    if (req.session.usuario) {
        res.json({
            nombres: req.session.usuario.nombres,
            correo: req.session.usuario.correo
        });
    } else {
        res.json({});
    }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: err.message,
        stack: app.get('env') === 'development' ? err.stack : {}
    });
});

// Iniciar el servidor

app.listen (PORT)  
    console.log(`Servidor corriendo en http://localhost:`, PORT);
