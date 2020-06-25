'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DimensionesSchema = Schema(
	{
		numGuia: String,
		nombreDimension: String,
		timestamp: Date,
		idPreguntas: [{ type: Schema.ObjectId, ref: 'Preguntas' }],
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Dimensiones', DimensionesSchema);
