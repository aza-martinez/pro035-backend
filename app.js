'use strict';
//Variables a utilizar.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//Definimos las rutas.
const rutaEmpresa = require('./Master/Rutas/empresas');
const rutaMensajes = require('./Master/Rutas/mensajes');
const rutaCentros = require('./Master/Rutas/centros');
const rutaAreas = require('./Master/Rutas/areas');
const rutaDepartamentos = require('./Master/Rutas/departamentos');
const rutaDimensiones = require('./Master/Rutas/dimensiones');
const rutaDominios = require('./Master/Rutas/dominios');
const rutaCategorias = require('./Master/Rutas/categorias');
const rutaEncuestas = require('./Master/Rutas/encuestas');
const rutaEncuestas2 = require('./Master/Rutas/encuesta');
const rutaPreguntas = require('./Master/Rutas/preguntas');
const rutaRespuestas = require('./Master/Rutas/respuestas');
const rutaEncuestasC = require('./Master/Rutas/encuestasContestadas');
const rutaEmpleados = require('./Master/Rutas/empleados');
const rutaPeriodos = require('./Master/Rutas/periodos');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DEconstE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DEconstE');
	next();
});

app.use('/api', [
	rutaEmpresa,
	rutaMensajes,
	rutaAreas,
	rutaDimensiones,
	rutaCategorias,
	rutaEncuestas,
	rutaEncuestas2,
	rutaPreguntas,
	rutaRespuestas,
	rutaEncuestasC,
	rutaEmpleados,
	rutaPeriodos,
]);
module.exports = app;
