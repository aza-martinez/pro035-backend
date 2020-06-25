'use strict';
var express = require('express');
var AreasController = require('../controllers/areas');
var auth0 = require('../helpers/auth0');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// Rutas útiles
router.post('/area/guardar/:idCentro', AreasController.guardar);
router.get('/area/listar/', AreasController.listar);
router.put('/area/desactivar/:id', AreasController.eliminar);
router.put('/area/modificar/:id', AreasController.modificar);
module.exports = router;
