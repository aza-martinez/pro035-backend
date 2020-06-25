'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DominioSchema = Schema(
	{
		numGuia: String,
		nombreDominio: String,
		timestamp: Date,
		idDimension: [{ type: Schema.ObjectId, ref: 'Dimensiones' }],
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Dominios', DominioSchema);
