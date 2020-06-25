'use strict';
var express = require('express');

var EncuestasController = require('../controllers/encuestas');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.get('/encuesta/listar/:idEncuesta/', EncuestasController.listarE);
router.get('/encuestas/listarC/', EncuestasController.listarT);
module.exports = router;
