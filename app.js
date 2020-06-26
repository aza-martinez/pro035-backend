"use strict";
//Variables a utilizar.
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Definimos las rutas.
const rutaEmpresa = require("./routes/empresas");
const rutaMensajes = require("./routes/mensajes");
const rutaCentros = require("./routes/centros");
const rutaAreas = require("./routes/areas");
const rutaDepartamentos = require("./routes/departamentos");
const rutaDimensiones = require("./routes/dimensiones");
const rutaDominios = require("./routes/dominios");
const rutaCategorias = require("./routes/categorias");
const rutaEncuestas = require("./routes/encuestas");
const rutaEncuestas2 = require("./routes/encuesta");
const rutaPreguntas = require("./routes/preguntas");
const rutaRespuestas = require("./routes/respuestas");
const rutaEncuestasC = require("./routes/encuestasContestadas");
const rutaEmpleados = require("./routes/empleados");
const rutaPeriodos = require("./routes/periodos");

const auth0 = require("./helpers/auth0AccesToken");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${req.headers.origin}`);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
	"GET, POST, OPTIONS, PUT, DELETE",
  );
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(async function(req, res, next) {
	try {
		const tokenCache = await auth0.tokenCache(req, res);
		const { accessToken } = await tokenCache.getAccessToken();
		req.headers.authorization = `Bearer ${accessToken}`;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).send('Error Interno');
	}
});

app.use("/api", [
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
