'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreasSchema = Schema(
	{
		nombre: { type: String, lowercase: true, trim: true },
		descripcion: { type: String, lowercase: true, trim: true },
		estatus: { type: Boolean, default: true },
		timestamp: { type: Date, default: Date.now },
		idDepartamento: [{ type: Schema.ObjectId, ref: 'Departamentos' }],
		idEmpleados: [{ type: Schema.ObjectId, ref: 'Empleados' }],
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Area', AreasSchema);
