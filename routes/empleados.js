'use strict';
var express = require('express');
var EmpleadosController = require('../controllers/empleados');
var auth0 = require('../helpers/auth0');
var router = express.Router();

// Rutas útiles
router.post('/empleado/guardar/', EmpleadosController.guardar);
router.get('/empleado/listarT/', EmpleadosController.listarT);
router.get('/empleado/listar/:uidFB', EmpleadosController.listar);
router.put('/empleado/contestar/:uidFB?', EmpleadosController.contestar);
module.exports = router;
