'Use Strict';
const Departamento = require('../models/departamentos');
const Area = require('../models/areas');
const moment = require('moment');

const controller = {
	//Inicio Del Controlador
	guardar: async (req, res) => {
		//guardar area
		const idArea = req.params.idArea;
		const departamento = new Departamento();
		const params = req.body;
		const area = new Area();
		const fecha = new Date();
		const fechaMX = moment(fecha).tz('America/Mexico_City');
		const departamento_existe = await Departamento.findOne({ nombre: params.nombre });
		if (departamento_existe) {
			console.log(departamento_existe);
			console.log(departamento_existe._id);
			Area.find({ _id: idArea }, (err, area) => {
				console.log(area);
				const arrayDepartamento = area[0].idDepartamento;
				console.log(area);
				arrayDepartamento.push(departamento_existe._id);
				Area.findOneAndUpdate({ _id: idArea }, { idDepartamento: arrayDepartamento }, (err, transferenciaUpdated) => {});
				return res.status(400).send('El Departamento Ya Existe, Se Descartara Guardarlo Pero Se Vinculara Al Área De Trabajo Ó Centro....');
			});
		}

		if (!departamento_existe) {
			departamento.nombre = params.nombre;
			departamento.estatus = true;
			departamento.timestamp = fechaMX._d;

			const area_existe = await Area.findOne({ _id: idArea });
			if (!area_existe) {
				return res.status(400).send('No Existe Área De Trabajo....');
			}

			if (area_existe) {
				Area.find({ _id: idArea }, (err, centro) => {
					const arrayDepartamento = centro[0].idDepartamento;
					arrayDepartamento.push(departamento._id);
					Area.findOneAndUpdate({ _id: idArea }, { idDepartamento: arrayDepartamento }, (err, transferenciaUpdated) => {});
					departamento.save((err, areaStored) => {
						if (err || !areaStored) {
						}
					});
					return res.status(200).send({});
				});
			}
		}
	}, //fin de guardar area

	listar: async (req, res) => {
		//listar areas activas
		const query = Departamento.find({ estatus: true });
		const last = req.params.last;
		if (last || last != undefined) {
			query.limit(5);
		}
		query.sort('-_id').exec((err, departamentos) => {
			if (err) {
				return res.status(500).send({});
			}
			if (!departamentos) {
				return res.status(404).send({});
			}
			return res.status(200).send({ departamentos });
		});
	}, //fin de listar areas activas

	eliminar: async (req, res) => {
		//desacticonst areas
		const depaID = req.params.id;
		const params = req.body;
		Departamento.findOneAndUpdate({ _id: depaID }, { estatus: false }, (err, departamentoHide) => {
			return res.status(200).send('Departamento Desactivado.');
		});
	},
};
module.exports = controller;
