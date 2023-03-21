const mysql =require('mysql');

const conexion= mysql.createConnection({

    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_DATABASE,
})

conexion.connect((error) => {
    if(error) {
        console.log('No se pudo conectar porque: ' + error);
        return;
    }
      console.log('Conectado');

});

module.exports = conexion;