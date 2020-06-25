'use strict'

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MensajesSchema = Schema({
    
    mensaje: String,
    numGuia: String,
    orden: String,
    timestamp: Date,
    }, { versionKey: false });

module.exports = mongoose.model('Mensajes', MensajesSchema);
