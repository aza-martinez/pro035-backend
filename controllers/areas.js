'Use Strict';
const Area = require('../models/areas');
const Centro = require('../models/centros');
const moment = require('moment');

const controller = {
	guardar: async (req, res) => {
		const idCentro = req.params.idCentro;
		const area = new Area();
		const params = req.body;
		const centro = new Centro();
		const fecha = new Date();
		const fechaMX = moment(fecha).tz('America/Mexico_City');
		const area_existe = await Area.findOne({ nombre: params.nombre });
		if (area_existe) {
			Centro.find({ _id: idCentro }, (err, centro) => {
				const arrayArea = centro[0].idArea;
				arrayArea.push(area_existe._id);
				Centro.findOneAndUpdate({ _id: idCentro }, { idArea: arrayArea }, (err, transferenciaUpdated) => {});
				return res.status(400).send('El Área Ya Existe, Se Descartara Guardarla Pero Se Vinculara Al Centro De Trabajo....');
			});
		}
		if (!area_existe) {
			area.nombre = params.nombre;
			area.descripcion = params.descripcion;
			area.estatus = true;
			area.timestamp = fechaMX._d;

			const centro_existe = await Centro.findOne({ _id: idCentro });
			if (!centro_existe) {
				return res.status(400).send('No Existe Centro De Trabajo....');
			}

			if (centro_existe) {
				Centro.find({ _id: idCentro }, (err, centro) => {
					const arrayArea = centro[0].idArea;
					arrayArea.push(area._id);
					Centro.findOneAndUpdate({ _id: idCentro }, { idArea: arrayArea }, (err, transferenciaUpdated) => {});
					area.save((err, areaStored) => {
						if (err || !areaStored) {
						}
					});
					return res.status(200).send({});
				});
			}
		}
	},

	listar: async (req, res) => {
		const query = Area.find({ estatus: true });
		const last = req.params.last;
		if (last || last != undefined) {
			query.limit(5);
		}
		query.sort('-_id').exec((err, areas) => {
			if (err) {
				return res.status(500).send({});
			}
			if (!areas) {
				return res.status(404).send({});
			}
			return res.status(200).send({ areas });
		});
	},

	eliminar: async (req, res) => {
		const areaID = req.params.id;
		const params = req.body;
		Area.findOneAndUpdate({ _id: areaID }, { estatus: false }, (err, areaHide) => {
			return res.status(200).send('Área Eliminada.');
		});
	},

	modificar: async (req, res) => {
		const area = req.params.id;
		const params = req.body;

		try {
			const validarNombre = !validator.isEmpty(params.nombre);
			const validarteDescripcion = !validator.isEmpty(params.descripcion);
		} catch (err) {
			return res.status(200).send({
				status: 'error',
				message: 'Faltan datos por enviar !!!',
			});
		}

		if (validarNombre && validarteDescripcion) {
			Area.findOneAndUpdate({ _id: area }, params, { new: true }, (err, areaModificada) => {
				if (err) {
					return res.status(500).send({
						status: 'error',
						message: 'Error al actualizar !!!',
					});
				}

				if (!areaModificada) {
					return res.status(404).send({
						status: 'error',
						message: 'No existe el articulo !!!',
					});
				}

				return res.status(200).send({
					status: 'success',
					article: areaModificada,
				});
			});
		} else {
			return res.status(200).send({
				status: 'error',
				message: 'La validación no es correcta !!!',
			});
		}
	},
};
module.exports = controller;
