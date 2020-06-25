'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CentrosSchema = Schema(
	{
		nombre: String,
		calle: String,
		colonia: String,
		cp: Number,
		telefono: String,
		estatus: Boolean,
		timestamp: Date,
		idArea: [{ type: Schema.ObjectId, ref: 'Areas' }],
		idPeriodo: [{ type: Schema.ObjectId, ref: 'Periodos' }],
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Centro', CentrosSchema);
