'Use Strict';

var validator = require('validator');
var Respuesta = require('../models/respuestas');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');

var controller = {
	//Inicio Del Controlador

	guardar: async (req, res) => {
		const respuesta = new Respuesta();
		var params = req.body;
		let fechaMX = moment(fecha).tz('America/Mexico_City');
		respuesta.nombreRespuesta = params.nombreRespuesta;
		respuesta.valorRespuesta = params.valorRespuesta;
		var fecha = new Date();
		respuesta.timestamp = fechaMX._d;
		respuesta.save((err, respuestaStored) => {
			if (err || !respuestaStored) {
				console.log(err);
				return res.status(404).send({});
			}
			res.status(200).send({ ...respuestaStored._doc });
		});
	},
	listar: async (req, res) => {
		nombre = req.params.nombre;
		var query = Respuesta.find({ nombreRespuesta: nombre });
		var last = req.params.last;
		if (last || last != undefined) {
			query.limit(5);
		}
		query.sort('-_id').exec((err, respuestas) => {
			if (err) {
				return res.status(500).send({});
			}
			if (!respuestas) {
				return res.status(404).send({});
			}
			return res.status(200).send({ respuestas });
		});
	},
}; //fin del controlador
module.exports = controller;
