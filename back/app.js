'use strict'

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

var cliente_route = require('./routes/cliente');

// Middleware de Express para parsear JSON y URL-encoded
app.use(express.json());  // Para parsear JSON
app.use(express.urlencoded({ extended: true }));  // Para parsear URL-encoded

// Conectar con MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tienda')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// CORS Middleware
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

// Rutas
app.use('/api', cliente_route);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
