'use strict';
var express = require('express');
var CategoriasController = require('../controllers/categorias');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.post('/categoria/guardar', CategoriasController.guardar);
router.get('/categoria/listar/:id', CategoriasController.listar);
router.get('/categoria/listarT/', CategoriasController.listarT);
router.get('/categoria/listar2/', CategoriasController.listar2);

module.exports = router;
