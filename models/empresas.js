'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpresasSchema = Schema(
	{
		razonSocial: String,
		alias: String,
		calle: String,
		colonia: String,
		cp: Number,
		rfc: String,
		estatus: Boolean,
		timestamp: Date,
		idCentro: [{ type: Schema.ObjectId, ref: 'Centro' }],
		idArea: [{ type: Schema.ObjectId, ref: 'Area' }],
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Empresa', EmpresasSchema);
