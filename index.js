const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const { dbConnection } = require('./database/config');
// Crear el servidor de express
const app = express();
app.use(bodyParser.json());
// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/table', require('./routes/tabla'));




// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});