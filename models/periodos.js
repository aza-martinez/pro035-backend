'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeriodosSchema = Schema(
	{
		nombre: String,
		rango: String,
		timestamp: Date,
		idEmpleado: [{ type: Schema.ObjectId, ref: 'Empleados' }],
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Periodos', PeriodosSchema);
