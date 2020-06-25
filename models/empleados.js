'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpleadosSchema = Schema(
	{
		nombre: String,
		paterno: String,
		materno: String,
		sexo: String,
		edad: String,
		edoCivil: String,
		sinFormacion: String,
		nivelEstudiosSF: String,
		nivelEstudiosP: String,
		nivelEstudiosS: String,
		nivelEstudiosB: String,
		nivelEstudiosTS: String,
		nivelEstudiosL: String,
		nivelEstudiosM: String,
		nivelEstudiosD: String,
		tipoPuesto: String,
		tipoContratacion: String,
		tipoPersonal: String,
		tipoJornada: String,
		rolarTurnos: String,
		expPuestoActual: String,
		email: String,
		perfil: String,
		expLaboral: String,
		usuario: String,
		passTemp: String,
		password: String,
		fstLogin: Boolean,
		timestamp: Date,
		perfil: String,
		statusE1: Boolean,
		statusE2: Boolean,
		statusE3: Boolean,
		uidFB: String,
		idPeriodo: { type: Schema.ObjectId, ref: 'Periodos' },
		idCentro: [{ type: Schema.ObjectId, ref: 'Centros' }],
		idDepartamento: [{ type: Schema.ObjectId, ref: 'Departamentos' }],
		idArea: [{ type: Schema.ObjectId, ref: 'Areas' }],
		idPuesto: [{ type: Schema.ObjectId, ref: 'Puestos' }],
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Empleado', EmpleadosSchema);
