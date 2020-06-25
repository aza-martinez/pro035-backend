'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RespuestasSchema = Schema(
	{
		nombreRespuesta: String,
		valorRespuesta: Number,
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Respuestas', RespuestasSchema);
