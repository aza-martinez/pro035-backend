'use strict';
var express = require('express');

var MensajesController = require('../controllers/mensajes');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.get('/mensajes/listar/', MensajesController.listar);
module.exports = router;
