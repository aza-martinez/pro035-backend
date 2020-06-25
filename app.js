'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const rEmpresas = require('./Master/Rutas/empresas');
const rMensajes = require('./Master/Rutas/mensajes');
const rCentros = require('./Master/Rutas/centros');
const rAreas = require('./Master/Rutas/areas');
const rDepartamentos_routes = require('./Master/Rutas/departamentos');
const rDimensiones = require('./Master/Rutas/dimensiones');
const rDominios = require('./Master/Rutas/dominios');
const categorias_routes = require('./Master/Rutas/categorias');
const encuestas_routes = require('./Master/Rutas/encuestas');
const encuestas2_routes = require('./Master/Rutas/encuesta');
const preguntas_routes = require('./Master/Rutas/preguntas');
const respuestas_routes = require('./Master/Rutas/respuestas');
const encuestasC_routes = require('./Master/Rutas/encuestasContestadas');
const empleados_routes = require('./Master/Rutas/empleados');
const periodos_routes = require('./Master/Rutas/periodos');

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

app.use(
	'/api',
	[mensajes_routes],
	[encuestas2_routes],
	[empresas_routes],
	[centros_routes],
	[areas_routes],
	[departamentos_routes],
	[dominios_routes],
	[dimensiones_routes],
	[categorias_routes],
	[encuestas_routes],
	[preguntas_routes],
	[respuestas_routes],
	[encuestasC_routes],
	[periodos_routes],
	[empleados_routes]
);
module.exports = app;
