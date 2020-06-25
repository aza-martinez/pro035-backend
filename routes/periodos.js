'use strict';
var express = require('express');

var PeriodosController = require('../controllers/periodos');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.post('/periodo/guardar/', PeriodosController.guardar);
router.get('/periodo/listar/', PeriodosController.listar);
module.exports = router;
