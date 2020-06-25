'use strict';
var express = require('express');

var DominiosController = require('../controllers/dominios');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.post('/dominio/guardar', DominiosController.guardar);
router.get('/dominio/listar/:nombre', DominiosController.listar);
router.get('/dominio/listar2/:nombre', DominiosController.listar2);
router.get('/dominio/listar3/', DominiosController.listar3);
module.exports = router;
