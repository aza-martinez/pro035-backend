'use strict'
var express = require('express');

var EncuestasCController = require('../Controladores/encuestasContestadas');
var auth0 = require('../Middleware/auth0');
var router = express.Router();

// Rutas útiles
router.post('/encuestaC/guardar/',   EncuestasCController.guardar); 
router.get('/encuestaC/listar/:nombre',   EncuestasCController.listar); 
router.get('/encuestaC/listarT/',   EncuestasCController.listarT); 
router.get('/graficar/:numGuia/:periodo',   EncuestasCController.graficar); 
module.exports = router;
