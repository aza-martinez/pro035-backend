'use strict';

const mongoose = require('mongoose');

const EmpresasSchema = mongoose.Schema(
	{
		razonSocial: {
			type: String,
			required: true,
			trim: true
		},
		alias: {
			type: String,
			required: true,
			trim: true
		},
		calle: {
			type: String,
			trim: true
		},
		colonia: {
			type: String,
			trim: true
		},
		cp: {
			type: String,
			trim: true
		},
		rfc: {
			type: String,
			trim: true,
			minlength: [ 12, 'RFC no válido' ],
			maxlength: [13, 'RFC no válido']
		},
		estatus: {
			type: Boolean,
			default: true
		},
		timestamp: {
			type: Date,
			default: Date.now()
		},
		idCentro: [ { type: mongoose.Schema.ObjectId, ref: 'Centro' } ],
		idArea: [ { type: mongoose.Schema.ObjectId, ref: 'Area' } ],
		areas: [ { type: mongoose.Schema.ObjectId, ref: 'Area' } ],
		centrosTrabajo: [ { type: mongoose.Schema.ObjectId, ref: 'Centro' } ]
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Empresa', EmpresasSchema);
