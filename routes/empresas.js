'use strict'
var express = require('express');

var EmpresasController = require('../Controladores/empresas');
var auth0 = require('../Middleware/auth0');
var router = express.Router();

// Rutas útiles
router.post('/empresa/guardar',  EmpresasController.guardar); 
router.post('/empresa/importar',  EmpresasController.importar); 
router.get('/empresa/listar/',   EmpresasController.listarEA); 
router.get('/empresa/listarI/',   EmpresasController.listarEI); 
router.get('/empresa/buscar/:buscar?',   EmpresasController.buscar);
router.put('/empresa/desactivar/:id',   EmpresasController.desactivar);
module.exports = router;
