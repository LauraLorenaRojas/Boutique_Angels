const db = require('../config/db');
const bcrypt = require('bcrypt');

// Función para autenticar un cliente (Modelo)
const autenticarCliente = (correo, contrasena, callback) => {
    const sql = `SELECT * FROM clientes WHERE correo = ?`;
    db.query(sql, [correo], (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result.length > 0) {
            const cliente = result[0];
            // Comparar la contraseña proporcionada con la encriptada
            bcrypt.compare(contrasena, cliente.contrasena, (err, isMatch) => {
                if (err) {
                    return callback(err);
                }
                if (isMatch) {
                    callback(null, cliente);  // Contraseña correcta
                } else {
                    callback(null, null);  // Contraseña incorrecta
                }
            });
        } else {
            callback(null, null);  // Usuario no encontrado
        }
    });
};

// Constante para el correo del administrador primario
const ADMIN_EMAIL = 'viviana123@gmail.com'; // Este es el correo del administrador primario

// Función para registrar un nuevo cliente
const registrarCliente = (clienteData, callback) => {
    const { nombres, apellidos, correo, contrasena, direccion, celular, rol } = clienteData;
    const fechaRegistro = new Date();

    // Verificamos si el rol es 'admin' y si el correo es diferente al del administrador primario
    if (rol === 'admin' && correo !== ADMIN_EMAIL) {
        return callback({ message: 'Solo el administrador primario puede registrarse como admin.' });
    }

    // Si el rol no es admin, asignamos 'cliente' por defecto
    const rolFinal = rol === 'admin' ? 'admin' : 'cliente';

    // Hashear la contraseña
    bcrypt.hash(contrasena, 10, (err, hashedPassword) => {
        if (err) {
            return callback(err);
        }

        const sql = `INSERT INTO clientes (nombres, apellidos, correo, contrasena, direccion, fechaRegistro, celular, rol) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [nombres, apellidos, correo, hashedPassword, direccion, fechaRegistro, celular, rolFinal], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    });
};

// Función para actualizar la contraseña de un cliente
const actualizarContrasena = (correo, nuevaContrasena, callback) => {
    bcrypt.hash(nuevaContrasena, 10, (err, hashedPassword) => {
        if (err) {
            return callback(err);
        }
        const sql = `UPDATE clientes SET contrasena = ? WHERE correo = ?`;
        db.query(sql, [hashedPassword, correo], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    });
};

// Función para obtener todos los clientes (ejemplo adicional)
const obtenerClientes = (callback) => {
    const sql = `SELECT * FROM clientes`;
    db.query(sql, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Exportar las funciones para su uso en otros módulos
module.exports = {
    registrarCliente,
    autenticarCliente,
    actualizarContrasena,
    obtenerClientes
};
