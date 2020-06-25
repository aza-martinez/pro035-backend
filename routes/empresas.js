'use strict';
var express = require('express');

var EmpresasController = require('../controllers/empresas');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.post('/empresa/guardar', EmpresasController.guardar);
router.get('/empresa/listar/', auth0, EmpresasController.listar);
router.put('/empresa/desactivar/:id', EmpresasController.eliminar);
module.exports = router;
