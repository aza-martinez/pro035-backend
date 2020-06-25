'use strict';
var express = require('express');

var ReportesController = require('../controllers/reportes');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.get('/reportes/listar/:idGuia?', CategoriasController.listar);

module.exports = router;
