'use strict'

const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PreguntasSchema = Schema({    
    numGuia: String,
    nombrePregunta: String,  
    timestamp: Date,
    numeroPregunta: Number,
    idRespuestas:  [{ type: Schema.ObjectId, ref: "Respuestas" }],

    }, { versionKey: false });

module.exports = mongoose.model('Preguntas', PreguntasSchema);
