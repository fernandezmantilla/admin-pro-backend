
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();
const puerto = process.env.PORT;

// Configurar cor
app.use(cors());
//Base de datos
dbConnection();

//rutas 
app.get('/', (req, res)=>{
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
});

app.listen(puerto, ( )=>{
    console.log(` Servidor corriendo en el puerto ${puerto}`);
});

