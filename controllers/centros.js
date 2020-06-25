'Use Strict';
const Empresa = require('../models/empresas');
const Centro = require('../models/centros');
const moment = require('moment');

const controller = {
	guardar: async (req, res) => {
		const idEmpresa = req.params.idEmpresa;
		const empresa = new Empresa();
		const params = req.body;
		const centro = new Centro();
		const fecha = new Date();
		const fechaMX = moment(fecha).tz('America/Mexico_City');
		const centro_existe = await Centro.findOne({ nombre: params.nombre });
		if (centro_existe) {
			return res.status(400).send('El Centro Ya Existe....');
		}
		if (!centro_existe) {
			centro.nombre = params.nombre;
			centro.telefono = params.telefono;
			centro.calle = params.calle;
			centro.colonia = params.colonia;
			centro.cp = params.cp;
			centro.estatus = true;
			centro.timestamp = fechaMX._d;

			const empresa_existe = await Empresa.findOne({ _id: idEmpresa });
			if (!empresa_existe) {
				return res.status(400).send('No Existe La Empresa O Empresa Para Asignar Centro De Trabajo....');
			}
			if (empresa_existe) {
				Empresa.find({ _id: idEmpresa }, (err, empresa) => {
					const arrayCentro = empresa[0].idCentro;
					arrayCentro.push(centro._id);
					Empresa.findOneAndUpdate({ _id: idEmpresa }, { idCentro: arrayCentro }, (err, transferenciaUpdated) => {});
					centro.save((err, centroStored) => {
						if (err || !centroStored) {
						}
					});
					return res.status(200).send({});
				});
			}
		}
	}, //fin de guardar centro

	listar: async (req, res) => {
		//listar centros activas
		const query = Centro.find({ estatus: true });
		const last = req.params.last;
		if (last || last != undefined) {
			query.limit(5);
		}
		query.sort('-_id').exec((err, centros) => {
			if (err) {
				return res.status(500).send({});
			}
			if (!centros) {
				return res.status(404).send({});
			}
			return res.status(200).send({ centros });
		});
	}, //fin de listar centros activas

	eliminar: async (req, res) => {
		//Metodo Guardar
		const centID = req.params.id;
		const params = req.body;
		Centro.findOneAndUpdate({ _id: centID }, { estatus: false }, (err, centroHide) => {
			return res.status(200).send('Centro Desactivado.');
		});
	},
};
module.exports = controller;
