'use strict'
var express = require('express');

var PeriodosController = require('../Controladores/periodos');
var auth0 = require('../Middleware/auth0');
var router = express.Router();

// Rutas útiles
router.post('/periodo/guardar/',   PeriodosController.guardar); 
router.get('/periodo/listar/',   PeriodosController.listar); 
module.exports = router;
