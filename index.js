
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

const puerto = process.env.PORT;

// Configurar cor
app.use(cors());


// carpeta pública......
app.use( express.static('public'));
// lectura y parseo del body..
app.use(express.json());
//Base de datos
dbConnection();

//rutas 
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/upload', require('./routes/uploads') );

app.listen(puerto, () => {
    console.log(` Servidor corriendo en el puerto ${puerto}`);
});

