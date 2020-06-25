'Use Strict';

var validator = require('validator');
var Empleado = require('../Modelos/empleados');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');
var controller = {
	//Inicio Del Controlador

	guardar: async (req, res) => {
		const empleado = new Empleado();
		var params = req.body;
		let fechaMX = moment(fecha).tz('America/Mexico_City');
		let usuario = await Empleado.findOne({ usuario: params.usuario });
		if (usuario) return res.status(400).send('Usuario Ya Existe....');
		empleado.nombre = params.nombre;
		empleado.paterno = params.paterno;
		empleado.materno = params.materno;
		empleado.edad = '';
		empleado.sexo = params.sexo;
		empleado.edoCivil = params.edoCivil;
		empleado.uidFB = params.uidFB;
		empleado.sinFormacion = params.sinFormacion;
		empleado.nivelEstudiosSF = params.nivelEstudiosSF;
		empleado.nivelEstudiosP = params.nivelEstudiosP;
		empleado.nivelEstudiosS = params.nivelEstudiosS;
		empleado.nivelEstudiosB = params.nivelEstudiosB;
		empleado.nivelEstudiosTS = params.nivelEstudiosTS;
		empleado.nivelEstudiosL = params.nivelEstudiosL;
		empleado.nivelEstudiosM = params.nivelEstudiosM;
		empleado.nivelEstudiosD = params.nivelEstudiosD;
		empleado.profesion = params.profesion;
		empleado.tipoPuesto = params.tipoPuesto;
		empleado.tipoContratacion = params.tipoContratacion;
		empleado.tipoPersonal = params.tipoPersonal;
		empleado.tipoJornada = params.tipoJornada;
		empleado.rolarTurnos = '';
		empleado.statusE1 = Boolean(params.statusE1);
		empleado.statusE2 = Boolean(params.statusE2);
		empleado.statusE3 = Boolean(params.statusE3);
		empleado.expPuestoActual = '';
		empleado.email = params.email;
		empleado.expLaboral = '';
		empleado.usuario = params.usuario;
		empleado.perfil = params.perfil;
		empleado.passTemp = params.passTemp;
		empleado.idCentro = params.idCentro;
		empleado.idArea = params.idArea;
		empleado.idPuesto = params.idPuesto;
		empleado.idDepartamento = params.idDepartamento;
		const password = params.passTemp;
		console.log(params.passTemp);
		console.log(password);
		const hash = bcryptjs.hashSync(password, 11);
		empleado.password = hash;
		empleado.fstLogin = true;
		empleado.timestamp = fechaMX._d;
		var fecha = new Date();
		empleado.save((err, empleadoStored) => {
			if (err || !empleadoStored) {
				console.log(err);
				return res.status(404).send({ err });
			}
			res.status(200).send({
				_id: empleado._id,
				nombre: empleado.nombre,
				paterno: empleado.paterno,
				materno: empleado.materno,
				email: empleado.email,
				usuario: empleado.usuario,
				password: empleado.password,
			});
		});
	},
	listarT: async (req, res) => {
		var query = Empleado.find({});
		var last = req.params.last;
		if (last || last != undefined) {
			query.limit(5);
		}
		query.sort('-_id').exec((err, empleados) => {
			if (err) {
				return res.status(500).send({});
			}
			if (!empleados) {
				return res.status(404).send({});
			}
			return res.status(200).send({ empleados });
		});
	},

	contestar: async (req, res) => {
		const empleado = new Empleado();
		var params = req.body;
		var empleadoID = req.params.uidFB;
		console.log(empleadoID);
		console.log(params);
		let fechaMX = moment(fecha).tz('America/Mexico_City');
		try {
			let usuario = await Empleado.find({ uidFB: empleadoID });
			if (usuario) {
				empleado.edad = params.edad;
				empleado.edoCivil = params.edoCivil;
				empleado.nivelEstudiosSF = params.nivelEstudiosSF;
				empleado.nivelEstudiosP = params.nivelEstudiosP;
				empleado.nivelEstudiosS = params.nivelEstudiosS;
				empleado.nivelEstudiosB = params.nivelEstudiosB;
				empleado.nivelEstudiosTS = params.nivelEstudiosTS;
				empleado.nivelEstudiosL = params.nivelEstudiosL;
				empleado.nivelEstudiosM = params.nivelEstudiosM;
				empleado.nivelEstudiosD = params.nivelEstudiosD;
				empleado.profesion = params.profesion;
				empleado.uidFB = params.uidFB;
				empleado.sinFormacion = params.sinFormacion;
				empleado.departamento = params.departamento;
				empleado.tipoPuesto = params.tipoPuesto;
				empleado.tipoContratacion = params.tipoContratacion;
				empleado.tipoPersonal = params.tipoPersonal;
				empleado.tipoJornada = params.tipoJornada;
				empleado.rolarTurnos = params.rolarTurnos;
				empleado.experiencia = params.experiencia;
				empleado.expPuestoActual = params.expPuestoActual;
				empleado.expLaboral = params.expLaboral;
				empleado.passTemp = params.passTemp;
				empleado.idCentro = params.idCentro;
				empleado.idArea = params.idArea;
				empleado.idDepartamento = params.idDepartamento;
				empleado.puesto = params.puesto;
				empleado.fstLogin = params.fstLogin;
				const password = params.passTemp; /* 
        const hash = bcryptjs.hashSync(password,11);
        empleado.password = hash; */
				empleado.fstLogin = false;
				empleado.timestamp = fechaMX._d;
				var fecha = new Date();

				console.log(params.uidFB);
				Empleado.findOneAndUpdate({ uidFB: params.uidFB }, params, { new: true }, (err, empleadoFind) => {
					if (err) {
						console.log(err);
						console.log('NO ENCONTRADO');
						return res.status(500).send({ err });
					}
					if (!empleadoFind || empleadoFind.length <= 0) {
						return res.status(500).send({ err });
					}

					console.log('ENCONTRADO Y Actualizado');
					console.log(empleadoFind);
					return res.status(200).send({ empleadoFind });
				});
			}
		} catch (err) {
			console.log(err);
			console.log('NO ENCONTRADO');
			return res.status(500).send({ err });
		}
	},

	listar: async (req, res) => {
		let idEmpleado = req.params.uidFB;

		Empleado.find({ uidFB: idEmpleado })
			.sort([['date', 'descending']])
			.exec((err, empleado) => {
				if (err) {
					console.log(err);
					return res.status(500).send({});
				}
				if (!empleado || empleado.length <= 0) {
				}
				console.log(empleado);
				return res.status(200).send(empleado);
			});
	},
}; //fin del controlador
module.exports = controller;
