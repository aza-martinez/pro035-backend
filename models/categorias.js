'use strict'

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriasSchema = Schema({
    numGuia: String,
    nombreCategoria: String,
    timestamp: Date,
    idDominio: [{ type: Schema.ObjectId, ref: "Dominios" }],
    }, { versionKey: false });

module.exports = mongoose.model('Categorias', CategoriasSchema);
