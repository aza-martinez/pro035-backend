'use strict'
var express = require('express');

var RespuestasController = require('../Controladores/respuestas');
var auth0 = require('../Middleware/auth0');
var router = express.Router();

// Rutas útiles
router.post('/respuestas/guardar',  RespuestasController.guardar); 
router.get('/respuestas/listar/:nombre',   RespuestasController.listar); 
module.exports = router;
