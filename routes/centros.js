'use strict';
var express = require('express');
var CentrosController = require('../controllers/centros');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.post('/centro/guardar/:idEmpresa', CentrosController.guardar);
router.get('/centro/listar/', CentrosController.listar);
router.put('/centro/desactivar/:id', CentrosController.eliminar);
module.exports = router;
