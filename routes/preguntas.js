'use strict';
var express = require('express');

var PreguntasController = require('../controllers/preguntas');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.post('/preguntas/guardar/', PreguntasController.guardar);
router.get('/preguntas/listar/:numeroPregunta', PreguntasController.listar);
module.exports = router;
