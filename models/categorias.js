'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriasSchema = Schema(
	{
		numGuia: String,
		nombreCategoria: String,
		timestamp: Date,
		idDominio: [{ type: Schema.ObjectId, ref: 'Dominios' }],
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Categorias', CategoriasSchema);
