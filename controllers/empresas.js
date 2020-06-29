'Use Strict';

const validator = require('validator');
const Empresa = require('../models/empresas');
const Centro = require('../models/centros');
const Area = require('../models/areas');
const moment = require('moment');
var envJSON = require('../env.variables.json');
var node_env = process.env.NODE_ENV || 'development';
const Mongo = require('../helpers/mongo');

if (node_env == 'production') {
	var data = envJSON[node_env].METADATA_P;
} else {
	var data = envJSON[node_env].METADATA_D;
}
const controller = {
	//Inicio Del Controlador
	guardar: async (req, res) => {
		//guardar empresa
		/* 		const SERVER_BD = req.user[`${data}`].empresa;
		const mongo = new Mongo();
		await mongo.connect(SERVER_BD);
		const close = await mongo.close(); */
		const params = req.body;
		const fecha = new Date();
		const fechaMX = moment(fecha).tz('America/Mexico_City');

		try {
			//VALIDACION DE DATOS DE EMPRESA
			const val_empresa_razonSocial = !validator.isEmpty(params.empresaRazonSocial);
			const val_empresa_alias = !validator.isEmpty(params.empresaAlias);
			const val_empresa_calle = !validator.isEmpty(params.empresaCalle);
			const val_empresa_colonia = !validator.isEmpty(params.empresaColonia);
			const val_empresa_cp = !validator.isEmpty(params.empresaCP);
			const val_empresa_rfc = !validator.isEmpty(params.empresaRFC);

			//VALIDACION DE DATOS DE CENTRO DE TRABAJO
			const val_centro_nombre = !validator.isEmpty(params.centroNombre);
			const val_centro_telefono = !validator.isEmpty(params.centroTelefono);
			const val_centro_calle = !validator.isEmpty(params.centroCalle);
			const val_centro_colonia = !validator.isEmpty(params.centroColonia);
			const val_centro_cp = !validator.isEmpty(params.centroCP);
		} catch (err) {
			return res.status(500).send({
				status: 'error',
				message: 'Faltan datos por enviarse !!!',
			});
		}

		const val_area_nombre = !validator.isEmpty(params.areaNombre);
		const val_area_descripcion = !validator.isEmpty(params.areaDescripcion);

		if (
			val_empresa_razonSocial &&
			val_empresa_alias &&
			val_empresa_calle &&
			val_empresa_colonia &&
			val_empresa_cp &&
			val_empresa_rfc &&
			val_centro_nombre &&
			val_centro_telefono &&
			val_centro_calle &&
			val_centro_colonia &&
			val_centro_cp
		) {
			// SI NO VIENEN VACIOS
			//CREAMOS EL OBJETO
			const empresa = new Empresa();
			const centro = new Centro();
			const area = new Area();

			// Asignar valores
			area.nombre = params.areaNombre;
			area.descripcion = params.areaDescripcion;
			area.estatus = true;
			area.timestamp = fechaMX._d;

			centro.nombre = params.centroNombre;
			centro.telefono = params.centroTelefono;
			centro.calle = params.centroCalle;
			centro.colonia = params.centroColonia;
			centro.cp = params.centroCP;
			centro.estatus = true;
			centro.timestamp = fechaMX._d;

			empresa.razonSocial = params.empresaRazonSocial;
			empresa.alias = params.empresaAlias;
			empresa.calle = params.empresaCalle;
			empresa.colonia = params.empresaColonia;
			empresa.rfc = params.empresaRFC;
			empresa.cp = params.empresaCP;
			empresa.estatus = true;
			empresa.timestamp = fechaMX._d;
			empresa.idCentro.push(centro._id);

			if (val_area_descripcion && val_area_nombre) {
				const area_existe = await Area.findOne({ nombre: params.areaNombre });
				if (area_existe) {
					return res.status(400).send('El Area Ya Existe.... Se Omitira El Área');
				}
				if (!area_existe) {
					//empresa.idArea.push(area._id);
					centro.idArea.push(area._id);
					area.save((err, areaStored) => {
						if (err || !areaStored) {
							return res.status(400).send(err);
						}
					});
				}
			} else {
			}

			const centro_existe = await Centro.findOne({ nombre: params.centroNombre });
			const empresa_existe = await Empresa.findOne({ rfc: params.empresaRFC });
			if (empresa_existe || centro_existe) {
				return res.status(400).send('La Empresa O Centro Ya Existe.... Se Omitira El Centro O La Empresa');
			}
			if (!empresa_existe && !centro_existe) {
				empresa.save((err, empresaStored) => {
					if (err || !empresaStored) {
						return res.status(400).send(err);
					}
					centro.save((err, centroStored) => {
						if (err || !centroStored) {
							return res.status(400).send(err);
						}
					});
				});
			}
			return res.status(200).send('OK');
		} else {
			return res.status(500).send({
				status: 'error',
				message: 'Los datos no son válidos !!!',
			});
		} //FIN DE LA VALIDACION DE DATOS DE CENTRO Y EMPRESA
	}, //fin de guardar empresa

	listar: async (req, res) => {
		const SERVER_BD = req.user[`${data}`].empresa;
		const mongo = new Mongo();
		await mongo.connect(SERVER_BD);
		console.log(SERVER_BD);
		try {
			Empresa.find()
				.populate({
					path: 'idCentro',
					populate: {
						path: 'idPeriodo',
						model: 'Periodos',
					},
				})
				.exec(async (err, registros) => {
					if (err) {
						console.log(err);
						const close = await mongo.close();
						return res.status(500).send({ err });
					}
					if (!registros || registros.length <= 0) {
						console.log(registros);
					}
					console.log(registros);
					const close = await mongo.close();
					return res.status(200).send(registros);
				});
		} catch (error) {
			console.log(error);
			const close = await mongo.close();
			return res.status(500).send(error);
		}
		//const close = await mongo.close();
	},

	eliminar: async (req, res) => {
		const empID = req.params.id;
		const params = req.body;
		Empresa.findOneAndUpdate({ _id: empID }, { estatus: false }, (err, empresaHide) => {
			return res.status(200).send('Empresa Desactivada.');
		});
	},
};
module.exports = controller;
