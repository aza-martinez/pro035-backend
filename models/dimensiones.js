'use strict'

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DimensionesSchema = Schema({
    numGuia: String,
    nombreDimension: String,
    timestamp: Date,
    idPreguntas:  [{ type: Schema.ObjectId, ref: "Preguntas" }],
    }, { versionKey: false });

module.exports = mongoose.model('Dimensiones', DimensionesSchema);
