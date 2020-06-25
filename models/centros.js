'use strict'

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CentrosSchema = Schema({
    nombre: String,
    calle: String,
    colonia: String,
    cp: Number,
    telefono: String,
    estatus: Boolean,
    timestamp: Date,
    idArea:  [{ type: Schema.ObjectId, ref: "Areas" }],
    idPeriodo:  [{ type: Schema.ObjectId, ref: "Periodos" }],
    }, { versionKey: false });

module.exports = mongoose.model('Centro', CentrosSchema);
