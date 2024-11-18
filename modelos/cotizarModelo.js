const db = require('../config/db');

// Función para verificar si ya existe una cotización
const verificarCotizacion = (clienteId, fecha) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM cotizacion WHERE clienteId = ? AND fecha = ?`;
        db.query(sql, [clienteId, fecha], (err, result) => {
            if (err) {
                return reject(err);
            }
            // Devuelve true si hay resultados, lo que indica que ya existe una cotización
            resolve(result.length > 0);
        });
    });
};

// Función para crear una nueva cotización y activar la edición solo para esta cotización
const crearCotizacion = (nuevaCotizacion) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Desactivar edición de todas las cotizaciones anteriores del cliente
            await desactivarEdicionCotizaciones(nuevaCotizacion.clienteId);

            // Marcar la nueva cotización como editable
            nuevaCotizacion.editable = true;

            const sql = `INSERT INTO cotizacion SET ?`;
            db.query(sql, nuevaCotizacion, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        } catch (error) {
            reject(error);
        }
    });
};

// Función para desactivar la edición de todas las cotizaciones de un cliente
const desactivarEdicionCotizaciones = (clienteId) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE cotizacion SET editable = false WHERE clienteId = ?`;
        db.query(sql, [clienteId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    crearCotizacion,
    verificarCotizacion,
    desactivarEdicionCotizaciones
};
