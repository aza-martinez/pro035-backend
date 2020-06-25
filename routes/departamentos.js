'use strict';
var express = require('express');
var DepartamentosController = require('../controllers/departamentos');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.post('/departamento/guardar/:idArea', DepartamentosController.guardar); //Guardar Un Centro.
router.get('/departamento/listar/', DepartamentosController.listar); //Listar Centros Activas.
router.put('/departamento/desactivar/:id', DepartamentosController.eliminar); //Desactivar Un Centro.
module.exports = router;
