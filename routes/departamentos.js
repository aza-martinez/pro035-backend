'use strict';
var express = require('express');
var DepartamentosController = require('../controllers/departamentos');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.post('/departamento/guardar/:idArea', DepartamentosController.guardar); //Guardar Un Centro.
router.post('/departamento/importar', DepartamentosController.importar); //Importar Varios Centros
router.get('/departamento/listarA/', DepartamentosController.listarDA); //Listar Centros Activas.
router.get('/departamento/listarI/', DepartamentosController.listarDI); //Listar Centros Inactivas.
router.get('/departamento/buscar/:buscar?', DepartamentosController.buscar); //Buscar Un Centro.
router.put('/departamento/desactivar/:id', DepartamentosController.desactivar); //Desactivar Un Centro.
module.exports = router;
