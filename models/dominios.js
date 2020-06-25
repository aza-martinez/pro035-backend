'use strict'

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DominioSchema = Schema({
    numGuia: String,
    nombreDominio: String,
    timestamp: Date,
    idDimension: [{ type: Schema.ObjectId, ref: "Dimensiones" }],
    }, { versionKey: false });

module.exports = mongoose.model('Dominios', DominioSchema);
