'Use Strict';
var validator = require('validator');
var EncuestaC = require('../models/encuestasContestadas');
var Empleado = require('../models/empleados');
var moment = require('moment');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var momentz = require('moment-timezone');
const RESPUESTAS = ['Casi Siempre', 'Casi nunca', 'Algunas Veces', 'Nunca', 'Siempre'];
const RESPUESTASCAT = ['Nulo Ó Despreciable', 'Bajo', 'Medio', 'Alto', 'Muy Alto'];
const RESPUESTASDOM = ['Nulo Ó Despreciable', 'Bajo', 'Medio', 'Alto', 'Muy Alto'];

var controller = {
	guardar: async (req, res) => {
		const encuestaC = new EncuestaC();
		const empleado = new Empleado();
		var params = req.body;
		let fecha = new Date();
		let fechaMX = moment(fecha).tz('America/Mexico_City');
		encuestaC.idGuia = params.idGuia;
		encuestaC.idEmpleado = params.idEmpleado;
		encuestaC.idPeriodo = params.idPeriodo;
		encuestaC.valorRespuesta = params.valorRespuesta;
		encuestaC.nombreRespuesta = params.nombreRespuesta;
		encuestaC.ats = params.ats;
		encuestaC.timestamp = fechaMX._d;
		if (params.statusE1 === false) {
			Empleado.findByIdAndUpdate({ _id: params.idEmpleado }, { statusE1: false }, { new: true }, (err, emp) => {});
		}
		if (params.statusE2 === false) {
			Empleado.findByIdAndUpdate({ _id: params.idEmpleado }, { statusE2: false }, { new: true }, (err, emp) => {});
		}
		if (params.statusE3 === false) {
			Empleado.findByIdAndUpdate({ _id: params.idEmpleado }, { statusE3: false }, { new: true }, (err, emp) => {});
		}
		for (var i = 0; i < params.respuestasC.length; i++) {
			var dataT = params.respuestasC;
			var valorT = params.respuestasC.valorRespuesta;
			console.log(dataT);
		}

		encuestaC.respuestasC = dataT;

		await encuestaC.save((err, respuestaStored) => {
			if (err || !respuestaStored) {
				return res.status(404).send({});
			}
			res.status(200).send({ ...respuestaStored._doc });
		});
	},

	graficar: async (req, res) => {
		let idGuia = req.params.numGuia;
		let periodo = req.params.periodo;
		if (req.params.numGuia === '1') {
			EncuestaC.find({ idGuia: '1', idPeriodo: periodo })
				.countDocuments()
				.exec((err, total) => {
					if (err) {
						return res.status(500).send({ err });
					}

					EncuestaC.find({ ats: true, idPeriodo: periodo })
						.countDocuments()
						.exec((err2, ats) => {
							if (err2) {
								return res.status(500).send({ err2 });
							}

							EncuestaC.find({ ats: true, idPeriodo: periodo })
								.populate({ path: 'idEmpleado' })
								.exec((err2, empleados) => {
									if (err2) {
										return res.status(500).send({ err2 });
									}
									const nombres = empleados.map(nombre => {
										let nombreCompleto = `${nombre.idEmpleado.nombre} ${nombre.idEmpleado.paterno} ${nombre.idEmpleado.materno}`;
										return nombreCompleto;
									});

									EncuestaC.find({ ats: false, idPeriodo: periodo })
										.countDocuments()
										.exec((err4, sinAts) => {
											if (err4) {
												return res.status(500).send({ err3 });
											}

											EncuestaC.find({ idGuia: '1', idPeriodo: periodo })
												.populate({ path: 'idEmpleado' })
												.exec((err5, empleados) => {
													if (err5) {
														return res.status(500).send({ err5 });
													}

													const nombresT = empleados.map(nombre => {
														let nombreTotal = `${nombre.idEmpleado.nombre} ${nombre.idEmpleado.paterno} ${nombre.idEmpleado.materno}`;
														return nombreTotal;
													});
													return res.status(200).send({
														empleadosConATS: ats,
														empleadosATS: nombres,
														empleadosSinATS: sinAts,
														TOTAL: total,
														empleadosEncuestados: nombresT,
													});
												});
										});
								});
						});
				});
		}
		if (req.params.numGuia === '2' || req.params.numGuia === '3') {
			EncuestaC.aggregate([
				{ $match: { idGuia: idGuia } },
				{
					$project: {
						_id: { nombre: '$respuestasC.nombreRespuesta', valor: '$respuestasC.valorRespuesta', numeroPregunta: '$respuestasC.numeroPregunta' },
					},
				},
			]).exec((err, registros) => {
				if (err) {
					return res.status(500).send({ err });
				}
				if (!registros || registros.length <= 0) {
					return res.status(500).send();
				}
				let name = registros[0]._id.nombre;
				let resultados = [];
				let final = 0;
				let totalDom = 0;
				let totalCat = 0;
				//VALORES FINALES DE LAS CATEGORIAS
				let finalCat1 = 0;
				let finalCat2 = 0;
				let finalCat3 = 0;
				let finalCat4 = 0;
				let finalCat5 = 0;
				let nivel = '';
				//ETIQUETAS DE LAS CATEGORIAS
				let nivelCat1 = '';
				let nivelCat2 = '';
				let nivelCat3 = '';
				let nivelCat4 = '';
				let nivelCat5 = '';
				//VALORES FINALES DE LOS DOMINIOS
				let finalDom1 = 0;
				let finalDom2 = 0;
				let finalDom3 = 0;
				let finalDom4 = 0;
				let finalDom5 = 0;
				let finalDom6 = 0;
				let finalDom7 = 0;
				let finalDom8 = 0;
				let finalDom9 = 0;
				let finalDom10 = 0;
				//ETIQUETAS DE LAS DOMINOS
				let nivelDom1 = '';
				let nivelDom2 = '';
				let nivelDom3 = '';
				let nivelDom4 = '';
				let nivelDom5 = '';
				let nivelDom6 = '';
				let nivelDom7 = '';
				let nivelDom8 = '';
				let nivelDom9 = '';
				let nivelDom10 = '';

				name.reduce(($resultados, name, index) => {
					value = registros[0]._id.valor[index];
					numPregunta = registros[0]._id.numeroPregunta[index];
					if (name != 'SI') {
						if (idGuia === '2') {
							//CONDICION SI ES LA GUIA 2 PARA LAS CATEGORIAS
							if (numPregunta === 1 || numPregunta === 2 || numPregunta === 3) {
								finalCat1 = value + finalCat1;
							}
							if (
								numPregunta === 4 ||
								numPregunta === 5 ||
								numPregunta === 6 ||
								numPregunta === 7 ||
								numPregunta === 8 ||
								numPregunta === 9 ||
								numPregunta === 10 ||
								numPregunta === 11 ||
								numPregunta === 12 ||
								numPregunta === 13 ||
								numPregunta === 41 ||
								numPregunta === 42 ||
								numPregunta === 43 ||
								numPregunta === 20 ||
								numPregunta === 21 ||
								numPregunta === 22 ||
								numPregunta === 18 ||
								numPregunta === 19 ||
								numPregunta === 26 ||
								numPregunta === 27
							) {
								finalCat2 = value + finalCat2;
							}
							if (numPregunta === 14 || numPregunta === 15 || numPregunta === 16 || numPregunta === 17) {
								finalCat3 = value + finalCat3;
							}
							if (
								numPregunta === 25 ||
								numPregunta === 24 ||
								numPregunta === 23 ||
								numPregunta === 28 ||
								numPregunta === 29 ||
								numPregunta === 30 ||
								numPregunta === 31 ||
								numPregunta === 32 ||
								numPregunta === 44 ||
								numPregunta === 45 ||
								numPregunta === 46 ||
								numPregunta === 33 ||
								numPregunta === 34 ||
								numPregunta === 35 ||
								numPregunta === 36 ||
								numPregunta === 37 ||
								numPregunta === 38 ||
								numPregunta === 39 ||
								numPregunta === 40
							) {
								finalCat4 = value + finalCat4;
							}
							if (
								numPregunta === 25 ||
								numPregunta === 24 ||
								numPregunta === 23 ||
								numPregunta === 28 ||
								numPregunta === 29 ||
								numPregunta === 30 ||
								numPregunta === 31 ||
								numPregunta === 32 ||
								numPregunta === 44 ||
								numPregunta === 45 ||
								numPregunta === 46 ||
								numPregunta === 33 ||
								numPregunta === 34 ||
								numPregunta === 35 ||
								numPregunta === 36 ||
								numPregunta === 37 ||
								numPregunta === 38 ||
								numPregunta === 39 ||
								numPregunta === 40
							) {
								finalCat5 = value + finalCat5;
							}
							//PARA LOS DOMINIOS
							if (numPregunta === 1 || numPregunta === 2 || numPregunta === 3) {
								finalDom1 = value + finalDom1;
							}
							if (
								numPregunta === 4 ||
								numPregunta === 5 ||
								numPregunta === 6 ||
								numPregunta === 7 ||
								numPregunta === 8 ||
								numPregunta === 9 ||
								numPregunta === 10 ||
								numPregunta === 11 ||
								numPregunta === 12 ||
								numPregunta === 13 ||
								numPregunta === 41 ||
								numPregunta === 42 ||
								numPregunta === 43
							) {
								finalDom2 = value + finalDom2;
							}
							if (
								numPregunta === 20 ||
								numPregunta === 21 ||
								numPregunta === 22 ||
								numPregunta === 29 ||
								numPregunta === 18 ||
								numPregunta === 26 ||
								numPregunta === 27
							) {
								finalDom3 = value + finalDom3;
							}
							if (numPregunta === 14 || numPregunta === 15) {
								finalDom4 = value + finalDom4;
							}
							if (numPregunta === 16 || numPregunta === 17) {
								finalDom5 = value + finalDom5;
							}
							if (numPregunta === 23 || numPregunta === 24 || numPregunta === 25 || numPregunta === 29 || numPregunta === 28) {
								finalDom6 = value + finalDom6;
							}
							if (numPregunta === 30 || numPregunta === 31 || numPregunta === 32 || numPregunta === 44 || numPregunta === 45 || numPregunta === 46) {
								finalDom7 = value + finalDom7;
							}
							if (
								numPregunta === 33 ||
								numPregunta === 34 ||
								numPregunta === 35 ||
								numPregunta === 36 ||
								numPregunta === 37 ||
								numPregunta === 39 ||
								numPregunta === 38 ||
								numPregunta === 40
							) {
								finalDom8 = value + finalDom8;
							}
							finalCat5 = 0;
							finalDom9 = 0;
							finalDom10 = 0;
							totalCat = finalCat1 + finalCat2 + finalCat3 + finalCat4 + finalCat5;
							totalDom = finalDom1 + finalDom2 + finalDom3 + finalDom4 + finalDom5 + finalDom6 + finalDom7 + finalDom8 + finalDom9 + finalDom10;
						}

						if (idGuia === '3') {
							//CONDICION SI ES LA GUIA 2 PARA LAS CATEGORIAS
							if (numPregunta === 1 || numPregunta === 2 || numPregunta === 3 || numPregunta === 4 || numPregunta === 5) {
								finalCat1 = value + finalCat1;
							}
							if (
								numPregunta === 12 ||
								numPregunta === 6 ||
								numPregunta === 7 ||
								numPregunta === 8 ||
								numPregunta === 9 ||
								numPregunta === 10 ||
								numPregunta === 11 ||
								numPregunta === 65 ||
								numPregunta === 66 ||
								numPregunta === 67 ||
								numPregunta === 68 ||
								numPregunta === 13 ||
								numPregunta === 14 ||
								numPregunta === 15 ||
								numPregunta === 16 ||
								numPregunta === 25 ||
								numPregunta === 26 ||
								numPregunta === 27 ||
								numPregunta === 28 ||
								numPregunta === 23 ||
								numPregunta === 24 ||
								numPregunta === 29 ||
								numPregunta === 30 ||
								numPregunta === 35 ||
								numPregunta === 36
							) {
								finalCat2 = value + finalCat2;
							}
							if (numPregunta === 17 || numPregunta === 18 || numPregunta === 19 || numPregunta === 20 || numPregunta === 21 || numPregunta === 22) {
								finalCat3 = value + finalCat3;
							}
							if (
								numPregunta === 31 ||
								numPregunta === 32 ||
								numPregunta === 33 ||
								numPregunta === 34 ||
								numPregunta === 37 ||
								numPregunta === 38 ||
								numPregunta === 39 ||
								numPregunta === 40 ||
								numPregunta === 41 ||
								numPregunta === 42 ||
								numPregunta === 43 ||
								numPregunta === 44 ||
								numPregunta === 45 ||
								numPregunta === 46 ||
								numPregunta === 69 ||
								numPregunta === 70 ||
								numPregunta === 71 ||
								numPregunta === 72 ||
								numPregunta === 57 ||
								numPregunta === 58 ||
								numPregunta === 59 ||
								numPregunta === 60 ||
								numPregunta === 61 ||
								numPregunta === 62 ||
								numPregunta === 63 ||
								numPregunta === 64
							) {
								finalCat4 = value + finalCat4;
							}
							if (
								numPregunta === 47 ||
								numPregunta === 48 ||
								numPregunta === 49 ||
								numPregunta === 50 ||
								numPregunta === 51 ||
								numPregunta === 52 ||
								numPregunta === 55 ||
								numPregunta === 56 ||
								numPregunta === 53 ||
								numPregunta === 54
							) {
								finalCat5 = value + finalCat5;
							}
							//PARA LOS DOMINIOS
							if (numPregunta === 1 || numPregunta === 2 || numPregunta === 3 || numPregunta === 4 || numPregunta === 5) {
								finalDom1 = value + finalDom1;
							}
							if (
								numPregunta === 6 ||
								numPregunta === 12 ||
								numPregunta === 7 ||
								numPregunta === 8 ||
								numPregunta === 9 ||
								numPregunta === 10 ||
								numPregunta === 11 ||
								numPregunta === 65 ||
								numPregunta === 66 ||
								numPregunta === 67 ||
								numPregunta === 68 ||
								numPregunta === 13 ||
								numPregunta === 14 ||
								numPregunta === 15 ||
								numPregunta === 16
							) {
								finalDom2 = value + finalDom2;
							}
							if (
								numPregunta === 25 ||
								numPregunta === 26 ||
								numPregunta === 27 ||
								numPregunta === 28 ||
								numPregunta === 23 ||
								numPregunta === 24 ||
								numPregunta === 29 ||
								numPregunta === 30 ||
								numPregunta === 35 ||
								numPregunta === 36
							) {
								finalDom3 = value + finalDom3;
							}
							if (numPregunta === 17 || numPregunta === 18) {
								finalDom4 = value + finalDom4;
							}
							if (numPregunta === 19 || numPregunta === 20 || numPregunta === 21 || numPregunta === 22) {
								finalDom5 = value + finalDom5;
							}
							if (
								numPregunta === 31 ||
								numPregunta === 32 ||
								numPregunta === 33 ||
								numPregunta === 34 ||
								numPregunta === 37 ||
								numPregunta === 38 ||
								numPregunta === 39 ||
								numPregunta === 40 ||
								numPregunta === 41
							) {
								finalDom6 = value + finalDom6;
							}
							if (
								numPregunta === 42 ||
								numPregunta === 43 ||
								numPregunta === 44 ||
								numPregunta === 45 ||
								numPregunta === 46 ||
								numPregunta === 69 ||
								numPregunta === 70 ||
								numPregunta === 71 ||
								numPregunta === 72
							) {
								finalDom7 = value + finalDom7;
							}
							if (
								numPregunta === 57 ||
								numPregunta === 58 ||
								numPregunta === 59 ||
								numPregunta === 60 ||
								numPregunta === 61 ||
								numPregunta === 62 ||
								numPregunta === 63 ||
								numPregunta === 64
							) {
								finalDom8 = value + finalDom8;
							}
							if (numPregunta === 47 || numPregunta === 48 || numPregunta === 49 || numPregunta === 50 || numPregunta === 51 || numPregunta === 52) {
								finalDom9 = value + finalDom9;
							}
							if (numPregunta === 55 || numPregunta === 56 || numPregunta === 53 || numPregunta === 54) {
								finalDom10 = value + finalDom10;
							}
							totalCat = finalCat1 + finalCat2 + finalCat3 + finalCat4 + finalCat5;
							totalDom = finalDom1 + finalDom2 + finalDom3 + finalDom4 + finalDom5 + finalDom6 + finalDom7 + finalDom8 + finalDom9 + finalDom10;
						}

						final = final + value;
					}
					if (idGuia === '2') {
						if (final < 20) {
							nivel = 'Nulo Ó Despreciable';
						}
						if (final >= 20 && final <= 45) {
							nivel = 'Bajo';
						}
						if (final >= 45 && final <= 70) {
							nivel = 'Medio';
						}
						if (final >= 70 && final <= 90) {
							nivel = 'Alto';
						}
						if (final >= 90) {
							nivel = 'Muy Alto';
						}

						if (finalCat1 < 3) {
							nivelCat1 = 'Nulo Ó Despreciable';
						}
						if (finalCat1 >= 3 && finalCat1 <= 5) {
							nivelCat1 = 'Bajo';
						}
						if (finalCat1 >= 5 && finalCat1 <= 7) {
							nivelCat1 = 'Medio';
						}
						if (finalCat1 >= 7 && finalCat1 <= 9) {
							nivelCat1 = 'Alto';
						}
						if (finalCat1 >= 9) {
							nivelCat1 = 'Muy Alto';
						}

						if (finalCat2 < 10) {
							nivelCat2 = 'Nulo Ó Despreciable';
						}
						if (finalCat2 >= 10 && finalCat2 <= 20) {
							nivelCat2 = 'Bajo';
						}
						if (finalCat2 >= 20 && finalCat2 <= 30) {
							nivelCat2 = 'Medio';
						}
						if (finalCat2 >= 30 && finalCat2 <= 40) {
							nivelCat2 = 'Alto';
						}
						if (finalCat2 >= 40) {
							nivelCat2 = 'Muy Alto';
						}

						if (finalCat3 < 4) {
							nivelCat3 = 'Nulo Ó Despreciable';
						}
						if (finalCat3 >= 4 && finalCat3 <= 6) {
							nivelCat3 = 'Bajo';
						}
						if (finalCat3 >= 6 && finalCat3 <= 9) {
							nivelCat3 = 'Medio';
						}
						if (finalCat3 >= 9 && finalCat3 <= 12) {
							nivelCat3 = 'Alto';
						}
						if (finalCat3 >= 12) {
							nivelCat3 = 'Muy Alto';
						}

						if (finalCat4 < 10) {
							nivelCat4 = 'Nulo Ó Despreciable';
						}
						if (finalCat4 >= 10 && finalCat4 <= 18) {
							nivelCat4 = 'Bajo';
						}
						if (finalCat4 >= 18 && finalCat4 <= 28) {
							nivelCat4 = 'Medio';
						}
						if (finalCat4 >= 28 && finalCat4 <= 38) {
							nivelCat4 = 'Alto';
						}
						if (finalCat4 >= 38) {
							nivelCat4 = 'Muy Alto';
						}
						//ETIQUETAS POR DOMINIO
						if (finalDom1 < 3) {
							nivelDom1 = 'Nulo Ó Despreciable';
						}
						if (finalDom1 >= 3 && finalDom1 <= 5) {
							nivelDom1 = 'Bajo';
						}
						if (finalDom1 >= 5 && finalDom1 <= 7) {
							nivelDom1 = 'Medio';
						}
						if (finalDom1 >= 7 && finalDom1 <= 9) {
							nivelDom1 = 'Alto';
						}
						if (finalDom1 >= 9) {
							nivelDom1 = 'Muy Alto';
						}

						if (finalDom2 < 12) {
							nivelDom2 = 'Nulo Ó Despreciable';
						}
						if (finalDom2 >= 12 && finalDom2 <= 16) {
							nivelDom2 = 'Bajo';
						}
						if (finalDom2 >= 16 && finalDom2 <= 20) {
							nivelDom2 = 'Medio';
						}
						if (finalDom2 >= 20 && finalDom2 <= 24) {
							nivelDom2 = 'Alto';
						}
						if (finalDom2 >= 24) {
							nivelDom2 = 'Muy Alto';
						}

						if (finalDom3 < 5) {
							nivelDom3 = 'Nulo Ó Despreciable';
						}
						if (finalDom3 >= 5 && finalDom3 <= 8) {
							nivelDom3 = 'Bajo';
						}
						if (finalDom3 >= 8 && finalDom3 <= 11) {
							nivelDom3 = 'Medio';
						}
						if (finalDom3 >= 11 && finalDom3 <= 14) {
							nivelDom3 = 'Alto';
						}
						if (finalDom3 >= 14) {
							nivelDom3 = 'Muy Alto';
						}

						if (finalDom4 < 1) {
							nivelDom4 = 'Nulo Ó Despreciable';
						}
						if (finalDom4 >= 1 && finalDom4 <= 2) {
							nivelDom4 = 'Bajo';
						}
						if (finalDom4 >= 2 && finalDom4 <= 4) {
							nivelDom4 = 'Medio';
						}
						if (finalDom4 >= 4 && finalDom4 <= 6) {
							nivelDom4 = 'Alto';
						}
						if (finalDom4 >= 6) {
							nivelDom4 = 'Muy Alto';
						}

						if (finalDom5 < 1) {
							nivelDom5 = 'Nulo Ó Despreciable';
						}
						if (finalDom5 >= 1 && finalDom5 <= 2) {
							nivelDom5 = 'Bajo';
						}
						if (finalDom5 >= 2 && finalDom5 <= 4) {
							nivelDom5 = 'Medio';
						}
						if (finalDom5 >= 4 && finalDom5 <= 6) {
							nivelDom5 = 'Alto';
						}
						if (finalDom5 >= 6) {
							nivelDom5 = 'Muy Alto';
						}

						if (finalDom6 < 3) {
							nivelDom6 = 'Nulo Ó Despreciable';
						}
						if (finalDom6 >= 3 && finalDom6 <= 5) {
							nivelDom6 = 'Bajo';
						}
						if (finalDom6 >= 5 && finalDom6 <= 8) {
							nivelDom6 = 'Medio';
						}
						if (finalDom6 >= 8 && finalDom6 <= 11) {
							nivelDom6 = 'Alto';
						}
						if (finalDom6 >= 11) {
							nivelDom6 = 'Muy Alto';
						}

						if (finalDom7 < 5) {
							nivelDom7 = 'Nulo Ó Despreciable';
						}
						if (finalDom7 >= 5 && finalDom7 <= 8) {
							nivelDom7 = 'Bajo';
						}
						if (finalDom7 >= 8 && finalDom7 <= 11) {
							nivelDom7 = 'Medio';
						}
						if (finalDom7 >= 11 && finalDom7 <= 14) {
							nivelDom7 = 'Alto';
						}
						if (finalDom6 >= 14) {
							nivelDom7 = 'Muy Alto';
						}

						if (finalDom8 < 7) {
							nivelDom8 = 'Nulo Ó Despreciable';
						}
						if (finalDom8 >= 7 && finalDom8 <= 10) {
							nivelDom8 = 'Bajo';
						}
						if (finalDom8 >= 10 && finalDom8 <= 13) {
							nivelDom8 = 'Medio';
						}
						if (finalDom8 >= 13 && finalDom8 <= 16) {
							nivelDom8 = 'Alto';
						}
						if (finalDom8 >= 16) {
							nivelDom8 = 'Muy Alto';
						}
					}
					if (idGuia === '3') {
						//ETIQUETAS PARA CAL FINAL
						if (final < 50) {
							nivel = 'Nulo Ó Despreciable';
						}
						if (final >= 50 && final <= 75) {
							nivel = 'Bajo';
						}
						if (final >= 75 && final <= 99) {
							nivel = 'Medio';
						}
						if (final >= 99 && final <= 140) {
							nivel = 'Alto';
						}
						if (final >= 140) {
							nivel = 'Muy Alto';
						}
						//ETIQUETAS POR CATEGORIA
						if (finalCat1 < 5) {
							nivelCat1 = 'Nulo Ó Despreciable';
						}
						if (finalCat1 >= 5 && finalCat1 <= 9) {
							nivelCat1 = 'Bajo';
						}
						if (finalCat1 >= 9 && finalCat1 <= 11) {
							nivelCat1 = 'Medio';
						}
						if (finalCat1 >= 11 && finalCat1 <= 14) {
							nivelCat1 = 'Alto';
						}
						if (finalCat1 >= 14) {
							nivelCat1 = 'Muy Alto';
						}
						if (finalCat2 < 15) {
							nivelCat2 = 'Nulo Ó Despreciable';
						}
						if (finalCat2 >= 15 && finalCat2 <= 30) {
							nivelCat2 = 'Bajo';
						}
						if (finalCat2 >= 30 && finalCat2 <= 45) {
							nivelCat2 = 'Medio';
						}
						if (finalCat2 >= 45 && finalCat2 <= 60) {
							nivelCat2 = 'Alto';
						}
						if (finalCat2 >= 60) {
							nivelCat2 = 'Muy Alto';
						}
						if (finalCat3 < 5) {
							nivelCat3 = 'Nulo Ó Despreciable';
						}
						if (finalCat3 >= 5 && finalCat3 <= 7) {
							nivelCat3 = 'Bajo';
						}
						if (finalCat3 >= 7 && finalCat3 <= 10) {
							nivelCat3 = 'Medio';
						}
						if (finalCat3 >= 10 && finalCat3 <= 13) {
							nivelCat3 = 'Alto';
						}
						if (finalCat3 >= 13) {
							nivelCat3 = 'Muy Alto';
						}
						if (finalCat4 < 14) {
							nivelCat4 = 'Nulo Ó Despreciable';
						}
						if (finalCat4 >= 14 && finalCat4 <= 29) {
							nivelCat4 = 'Bajo';
						}
						if (finalCat4 >= 29 && finalCat4 <= 42) {
							nivelCat4 = 'Medio';
						}
						if (finalCat4 >= 42 && finalCat4 <= 58) {
							nivelCat4 = 'Alto';
						}
						if (finalCat4 >= 58) {
							nivelCat4 = 'Muy Alto';
						}
						if (finalCat5 < 10) {
							nivelCat5 = 'Nulo Ó Despreciable';
						}
						if (finalCat5 >= 10 && finalCat5 <= 14) {
							nivelCat5 = 'Bajo';
						}
						if (finalCat5 >= 14 && finalCat5 <= 18) {
							nivelCat5 = 'Medio';
						}
						if (finalCat5 >= 18 && finalCat5 <= 23) {
							nivelCat5 = 'Alto';
						}
						if (finalCat5 >= 23) {
							nivelCat5 = 'Muy Alto';
						}

						//ETIQUETAS POR DOMINIO
						if (finalDom1 < 5) {
							nivelDom1 = 'Nulo Ó Despreciable';
						}
						if (finalDom1 >= 5 && finalDom1 <= 9) {
							nivelDom1 = 'Bajo';
						}
						if (finalDom1 >= 9 && finalDom1 <= 11) {
							nivelDom1 = 'Medio';
						}
						if (finalDom1 >= 11 && finalDom1 <= 14) {
							nivelDom1 = 'Alto';
						}
						if (finalDom1 >= 14) {
							nivelDom1 = 'Muy Alto';
						}

						if (finalDom2 < 15) {
							nivelDom2 = 'Nulo Ó Despreciable';
						}
						if (finalDom2 >= 15 && finalDom2 <= 21) {
							nivelDom2 = 'Bajo';
						}
						if (finalDom2 >= 21 && finalDom2 <= 27) {
							nivelDom2 = 'Medio';
						}
						if (finalDom2 >= 27 && finalDom2 <= 37) {
							nivelDom2 = 'Alto';
						}
						if (finalDom2 >= 37) {
							nivelDom2 = 'Muy Alto';
						}

						if (finalDom3 < 11) {
							nivelDom3 = 'Nulo Ó Despreciable';
						}
						if (finalDom3 >= 11 && finalDom3 <= 16) {
							nivelDom3 = 'Bajo';
						}
						if (finalDom3 >= 16 && finalDom3 <= 21) {
							nivelDom3 = 'Medio';
						}
						if (finalDom3 >= 21 && finalDom3 <= 25) {
							nivelDom3 = 'Alto';
						}
						if (finalDom3 >= 25) {
							nivelDom3 = 'Muy Alto';
						}

						if (finalDom4 < 1) {
							nivelDom4 = 'Nulo Ó Despreciable';
						}
						if (finalDom4 >= 1 && finalDom4 <= 2) {
							nivelDom4 = 'Bajo';
						}
						if (finalDom4 >= 2 && finalDom4 <= 4) {
							nivelDom4 = 'Medio';
						}
						if (finalDom4 >= 4 && finalDom4 <= 6) {
							nivelDom4 = 'Alto';
						}
						if (finalDom4 >= 6) {
							nivelDom4 = 'Muy Alto';
						}

						if (finalDom5 > 4) {
							nivelDom5 = 'Nulo Ó Despreciable';
						}
						if (finalDom5 >= 4 && finalDom5 <= 6) {
							nivelDom5 = 'Bajo';
						}
						if (finalDom5 >= 6 && finalDom5 <= 8) {
							nivelDom5 = 'Medio';
						}
						if (finalDom5 >= 8 && finalDom5 <= 10) {
							nivelDom5 = 'Alto';
						}
						if (finalDom5 >= 10) {
							nivelDom5 = 'Muy Alto';
						}

						if (finalDom6 < 9) {
							nivelDom6 = 'Nulo Ó Despreciable';
						}
						if (finalDom6 >= 9 && finalDom6 <= 12) {
							nivelDom6 = 'Bajo';
						}
						if (finalDom6 >= 12 && finalDom6 <= 16) {
							nivelDom6 = 'Medio';
						}
						if (finalDom6 >= 16 && finalDom6 <= 20) {
							nivelDom6 = 'Alto';
						}
						if (finalDom6 >= 20) {
							nivelDom6 = 'Muy Alto';
						}

						if (finalDom7 > 10) {
							nivelDom7 = 'Nulo Ó Despreciable';
						}
						if (finalDom7 >= 10 && finalDom7 <= 13) {
							nivelDom7 = 'Bajo';
						}
						if (finalDom7 >= 13 && finalDom7 <= 17) {
							nivelDom7 = 'Medio';
						}
						if (finalDom7 >= 17 && finalDom7 <= 21) {
							nivelDom7 = 'Alto';
						}
						if (finalDom6 >= 21) {
							nivelDom7 = 'Muy Alto';
						}

						if (finalDom8 > 7) {
							nivelDom8 = 'Nulo Ó Despreciable';
						}
						if (finalDom8 >= 7 && finalDom8 <= 10) {
							nivelDom8 = 'Bajo';
						}
						if (finalDom8 >= 10 && finalDom8 <= 13) {
							nivelDom8 = 'Medio';
						}
						if (finalDom8 >= 13 && finalDom8 <= 16) {
							nivelDom8 = 'Alto';
						}
						if (finalDom8 >= 16) {
							nivelDom8 = 'Muy Alto';
						}

						if (finalDom9 > 6) {
							nivelDom9 = 'Nulo Ó Despreciable';
						}
						if (finalDom9 >= 6 && finalDom9 <= 10) {
							nivelDom9 = 'Bajo';
						}
						if (finalDom9 >= 10 && finalDom9 <= 14) {
							nivelDom9 = 'Medio';
						}
						if (finalDom9 >= 14 && finalDom9 <= 18) {
							nivelDom9 = 'Alto';
						}
						if (finalDom9 >= 18) {
							nivelDom9 = 'Muy Alto';
						}

						if (finalDom10 < 4) {
							nivelDom10 = 'Nulo Ó Despreciable';
						}
						if (finalDom10 >= 4 && finalDom10 <= 6) {
							nivelDom10 = 'Bajo';
						}
						if (finalDom10 >= 6 && finalDom10 <= 8) {
							nivelDom10 = 'Medio';
						}
						if (finalDom10 >= 8 && finalDom10 <= 10) {
							nivelDom10 = 'Alto';
						}
						if (finalDom10 >= 10) {
							nivelDom10 = 'Muy Alto';
						}
					}
					resultados.push({ name, value, numPregunta });
					return $resultados;
				}, []);
				let $results = [];
				let grafica = [];
				let categorias = [];
				let dominios = [];

				RESPUESTAS.map($respuesta => {
					let counter = 0;
					resultados.map($result => {
						if ($result.name == $respuesta) (counter += $result.value), (numQues = $result.numPregunta);
					});
					$results.push({ name: $respuesta, value: counter });
				});

				categorias = [
					{
						name: 'categoriaAmbiente',
						value: finalCat1,
						tag: nivelCat1,
					},
					{
						name: 'categoriaFactores',
						value: finalCat2,
						tag: nivelCat2,
					},
					{
						name: 'categoriaOrganizacion',
						value: finalCat3,
						tag: nivelCat3,
					},
					{
						name: 'categoriaLiderazgo',
						value: finalCat4,
						tag: nivelCat4,
					},
					{
						name: 'categoriaEntorno',
						value: finalCat5,
						tag: nivelCat5,
					},
				];
				dominios = [
					{
						name: 'dominioCondiciones',
						value: finalDom1,
						tag: nivelDom1,
					},
					{
						name: 'dominioCarga',
						value: finalDom2,
						tag: nivelDom2,
					},
					{
						name: 'dominioFaltaDeControl',
						value: finalDom3,
						tag: nivelDom3,
					},
					{
						name: 'dominioJornada',
						value: finalDom4,
						tag: nivelDom4,
					},
					{
						name: 'dominioInterferencia',
						value: finalDom5,
						tag: nivelDom5,
					},
					{
						name: 'dominioLiderazgo',
						value: finalDom6,
						tag: nivelDom6,
					},
					{
						name: 'dominioRelaciones',
						value: finalDom7,
						tag: nivelDom7,
					},
					{
						name: 'dominioViolencia',
						value: finalDom8,
						tag: nivelDom8,
					},
					{
						name: 'dominioReconocimiento',
						value: finalDom9,
						tag: nivelDom9,
					},
					{
						name: 'dominioInsuficiente',
						value: finalDom10,
						tag: nivelDom10,
					},
				];

				grafica = {
					resultadoFinal: $results,
					cFinal: final,
					nivel: nivel,
					categorias: categorias,
					totalCategorias: totalCat,
					dominios: dominios,
					totalDominios: totalDom,
				};
				return res.status(200).send(grafica);
			});
		}
	},
	listar: async (req, res) => {
		var nombre = req.params.nombre;
		EncuestaC.find({ idEmpleado: nombre })
			.populate({ path: 'idEmpleado' })
			.populate({ path: 'idPeriodo' })
			.populate({ path: 'idCategoria' })
			.populate({ path: 'idDominio' })
			.populate({ path: 'idDimension' })
			.populate({ path: 'idPregunta' })
			.populate({ path: 'idRespuesta' })
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
	listarT: async (req, res) => {
		var nombre = req.params.nombre;
		EncuestaC.find({})
			.populate({ path: 'idEmpleado', model: 'Empleado' })
			.populate({ path: 'idPeriodo', model: 'Periodos' })
			.populate({ path: 'respuestasC.idCategoria', model: 'Categorias' })
			.populate({ path: 'respuestasC.idDominio', model: 'Dominios' })
			.populate({ path: 'respuestasC.idDimension', model: 'Dimensiones' })
			.populate({ path: 'respuestasC.idPregunta', model: 'Preguntas' })
			.populate({ path: 'respuestasC.respuesta', model: 'Respuestas' })
			.sort([['date', 'descending']])
			.exec((err, registros) => {
				if (err) {
					return res.status(500).send({ err });
				}
				if (!registros || registros.length <= 0) {
				}
				const valores = registros[0].respuestasC.map(respuesta => {
					return respuesta.valorRespuesta;
				});
				const nombres = registros[0].respuestasC.map(nombre => {
					return nombre.nombreRespuesta;
				});
				return res.status(200).send(registros);
			});
	},
};
module.exports = controller;
