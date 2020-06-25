'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EncuestaCSchema = Schema(
	{
		idGuia: String,
		idEmpleado: { type: Schema.ObjectId, ref: 'Empleado' },
		timestamp: Date,
		idPeriodo: { type: Schema.ObjectId, ref: 'Periodos' },
		idRespuesta: { type: Schema.ObjectId, ref: 'Respuestas' },
		idPreguntas: { type: Schema.ObjectId, ref: 'Preguntas' },
		idCategoria: { type: Schema.ObjectId, ref: 'Categorias' },
		idDominio: { type: Schema.ObjectId, ref: 'Dominios' },
		idDimension: { type: Schema.ObjectId, ref: 'Dimensiones' },
		ats: Boolean,
		respuestasC: [],
		valorRespuesta: Number,
		nombreRespuesta: String,
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Contestada', EncuestaCSchema);
