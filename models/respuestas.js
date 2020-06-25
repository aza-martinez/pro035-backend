'use strict'

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RespuestasSchema = Schema({
    nombreRespuesta: String,
    valorRespuesta: Number,
    }, { versionKey: false });

module.exports = mongoose.model('Respuestas', RespuestasSchema);