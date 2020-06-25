'use strict'
var express = require('express');

var AreasController = require('../Controladores/areas');
var auth0 = require('../Middleware/auth0');
var router = express.Router();

// Rutas útiles
router.post('/area/guardar/:idCentro',  AreasController.guardar); 
router.post('/area/importar',  AreasController.importar); 
router.get('/area/listarA/',   AreasController.listarAA); 
router.get('/area/listarI/',   AreasController.listarAI); 
router.get('/area/buscar/:buscar?',   AreasController.buscar);
router.put('/area/desactivar/:id',   AreasController.desactivar); 
router.put('/area/modificar/:id',   AreasController.modificar); 
module.exports = router;
