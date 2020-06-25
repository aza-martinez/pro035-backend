'use strict'
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EncuestasSchema = Schema({    
    numGuia: String,
    numeroEncuesta: String,
    timestamp: Date,
    idCategoria:  [{ type: Schema.ObjectId, ref: "Categorias" }],
    idDominio:  [{ type: Schema.ObjectId, ref: "Dominios" }],
    idDimension:  [{ type: Schema.ObjectId, ref: "Dimensiones" }],
    idPregunta:  [{ type: Schema.ObjectId, ref: "Preguntas" }],
    idRespuesta:  [{ type: Schema.ObjectId, ref: "Respuestas" }],
    idMensaje:  { type: Schema.ObjectId, ref: "Mensajes" },
    }, { versionKey: false });
module.exports = mongoose.model('Encuesta', EncuestasSchema);
