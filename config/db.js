const mysql = require('mysql2');
const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = require('./config.js');

const connection = mysql.createConnection({

  user: DB_USER,       
  password: DB_PASSWORD,  
  host: DB_HOST,  
  port: DB_PORT,               
  database: DB_NAME,
  connectTimeout: 1000000
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:');
    console.error('Código de error:', err.code);
    console.error('Número de error:', err.errno);
    console.error('Mensaje:', err.message);
    return;
  }
  console.log('Conexión a la base de datos');
});


module.exports = connection;
