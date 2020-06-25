'use strict';
var express = require('express');

var EncuestasController = require('../controllers/encuesta');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.get('/encuestas/listar/', EncuestasController.listar);
module.exports = router;
