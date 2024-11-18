const db = require('../config/db');


// Función para autenticar un cliente
const autenticarCliente = (correo, contrasena, callback) => {
    debugger
    const sql = `SELECT * FROM clientes WHERE correo = ? AND contrasena = ?`;
   
        db.query(sql, [correo, contrasena], (err, result) => {
            debugger
            if (err) {
                return callback(err);
            }
            if (result.length > 0) {
                console.log(result[0])
                callback(null, result[0])  // Usuario encontrado
                  // Redirigir a la página principal del usuario
            } else {
                callback(null, null);  // Usuario no encontrado
            }
        });
    
};

module.exports = {
    autenticarCliente
};