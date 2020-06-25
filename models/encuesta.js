'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EncuestasSchema = Schema(
	{
		numeroEncuesta: String,
		timestamp: Date,
	},
	{ versionKey: false }
);

module.exports = mongoose.model('Encuestas', EncuestasSchema);
