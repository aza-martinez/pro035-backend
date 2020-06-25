'Use Strict';
const Categoria = require('../models/categorias');
const moment = require('moment');

const controller = {
	//Inicio Del Controlador
	guardar: async (req, res) => {
		const categoria = new Categoria();
		const params = req.body;
		const fechaMX = moment(fecha).tz('America/Mexico_City');
		categoria.numGuia = params.numGuia;
		categoria.nombreCategoria = params.nombreCategoria;
		categoria.idDominio = params.idDominio;
		const fecha = new Date();
		categoria.timestamp = fechaMX._d;
		categoria.save((err, categoriaStored) => {
			if (err || !categoriaStored) {
				console.log(err);
				return res.status(404).send({});
			}
			res.status(200).send({ ...categoriaStored._doc });
		});
	},

	listarT: async (req, res) => {
		Categoria.find({})
			.populate('idDominio')
			.exec((err, categorias) => {
				if (err) {
					console.log(err);
					return res.status(500).send({});
				}
				if (!categorias || categorias.length <= 0) {
				}
				console.log(categorias);
				return res.status(200).send(categorias);
			});
	},

	listar: async (req, res) => {
		const idCategoria = req.params.id;
		console.log(req.params);
		Categoria.findById({ _id: idCategoria })
			.populate({
				path: 'idDominio',
				populate: {
					path: 'idDimension',
					model: 'Dimensiones',
					populate: {
						path: 'idPreguntas',
						model: 'Preguntas',

						populate: {
							path: 'idRespuestas',
							model: 'Respuestas',
						},
					},
				},
			})
			.sort([['date', 'descending']])
			.exec((err, categorias) => {
				if (err) {
					console.log(err);
					return res.status(500).send({});
				}
				if (!categorias || categorias.length <= 0) {
				}
				console.log(categorias);
				return res.status(200).send([categorias]);
			});
	},

	listar2: (req, res) => {
		const nombre = req.params.nombre;
		Categoria.find({})
			.populate({
				path: 'idDominio',
				populate: {
					path: 'idDimension',
					model: 'Dimensiones',
					populate: {
						path: 'idPreguntas',
						model: 'Preguntas',

						populate: {
							path: 'idRespuestas',
							model: 'Respuestas',
						},
					},
				},
			})
			.sort([['date', 'descending']])
			.exec((err, registros) => {
				if (err) {
					return res.status(500).send({ err });
				}
				if (!registros || registros.length <= 0) {
				}

				return res.status(200).send(registros);
			});
	},
};
module.exports = controller;
