
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();
const puerto = process.env.PORT;

// Configurar cor
app.use(cors());

// lectura y parseo del body..
app.use(express.json());
//Base de datos
dbConnection();

//rutas 
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/login', require('./routes/auth'));


app.listen(puerto, ( )=>{
    console.log(` Servidor corriendo en el puerto ${puerto}`);
});

