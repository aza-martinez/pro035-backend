'use strict';
var express = require('express');
var CentrosController = require('../controllers/centros');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.post('/centro/guardar/:idEmpresa', CentrosController.guardar);
router.post('/centro/importar', CentrosController.importar);
router.get('/centro/listarA/', CentrosController.listarCA);
router.get('/centro/listarI/', CentrosController.listarCI);
router.get('/centro/buscar/:buscar?', CentrosController.buscar);
router.put('/centro/desactivar/:id', CentrosController.desactivar);
module.exports = router;
