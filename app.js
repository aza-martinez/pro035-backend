'use strict';
//Variables a utilizar.
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//Definimos las rutas.
const rutaEmpresa = require('./routes/empresas');
const rutaMensajes = require('./routes/mensajes');
const rutaCentros = require('./routes/centros');
const rutaAreas = require('./routes/areas');
const rutaDepartamentos = require('./routes/departamentos');
const rutaDimensiones = require('./routes/dimensiones');
const rutaDominios = require('./routes/dominios');
const rutaCategorias = require('./routes/categorias');
const rutaEncuestas = require('./routes/encuestas');
const rutaEncuestas2 = require('./routes/encuesta');
const rutaPreguntas = require('./routes/preguntas');
const rutaRespuestas = require('./routes/respuestas');
const rutaEncuestasC = require('./routes/encuestasContestadas');
const rutaEmpleados = require('./routes/empleados');
const rutaPeriodos = require('./routes/periodos');

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
