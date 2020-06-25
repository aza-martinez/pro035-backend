'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartamentosSchema = Schema(
	{
		nombre: String,
		estatus: Boolean,
		timestamp: Date,
		idEmpleados: [{ type: Schema.ObjectId, ref: 'Empleados' }],
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Departamento', DepartamentosSchema);
