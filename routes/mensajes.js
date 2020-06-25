'use strict'
var express = require('express');

var MensajesController = require('../Controladores/mensajes');
var auth0 = require('../Middleware/auth0');
var router = express.Router();

// Rutas útiles
router.get('/mensajes/listar/',   MensajesController.listar); 
module.exports = router;
