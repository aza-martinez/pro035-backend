'Use Strict';
var Mensaje = require('../models/mensajes');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');

var controller = {
	//Inicio Del Controlador

	listar: async (req, res) => {
		Mensaje.find({})
			.sort([['date', 'descending']])
			.exec((err, registros) => {
				if (err) {
					return res.status(500).send({ err });
				}
				if (!registros || registros.length <= 0) {
				}

				console.log(registros);
				return res.status(200).send(registros);
			});
	},
};
module.exports = controller;
