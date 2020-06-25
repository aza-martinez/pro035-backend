'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreguntasSchema = Schema(
	{
		numGuia: String,
		nombrePregunta: String,
		timestamp: Date,
		numeroPregunta: Number,
		idRespuestas: [{ type: Schema.ObjectId, ref: 'Respuestas' }],
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Preguntas', PreguntasSchema);
