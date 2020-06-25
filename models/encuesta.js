'use strict'

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EncuestasSchema = Schema({
    
    numeroEncuesta: String,
    timestamp: Date,

    }, { versionKey: false });

module.exports = mongoose.model('Encuestas', EncuestasSchema);
