"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

function getDate() {
  return moment().tz('America/Monterrey').toString();
}

const RespuestaEncuestaContestada = new Schema({
    categoria: {
      type: Schema.ObjectId,
      ref: "Categorias"
    },
    dominio: {
      type: Schema.ObjectId,
      ref: 'Dominios'
    },
    dimension: {
      type: Schema.ObjectId,
      ref: 'Dimensiones'
    },
    pregunta: {
      type: Schema.ObjectId,
      ref: 'Preguntas'
    },
    respuesta: {
      type: Schema.ObjectId,
      ref: 'Respuestas'
    },
    valorRespuesta: Number,
    enumeracion: Number,
    descripcionRespuesta: String,
});


const EncuestaCSchema = new Schema(
  {
    numeroGuia: {
      type: String,
      trim: true,
      required: true,
    },
    empleado: { type: Schema.ObjectId, ref: "Empleado", required: true },
    timestamp: Date,
    periodoEvaluacion: {
      type: Schema.ObjectId,
      ref: "PeriodosEvaluacion",
      required: true,
    },
    ats: {
      type: Boolean,
    },
    requireAnalisis: {
      type: Boolean,
    },
    respuestas: [RespuestaEncuestaContestada],
    createdAt: {
      type: Date,
    },
    updatedAt: Date
  },
  {
    versionKey: false,
    timestamps: {
      currentTime: getDate
    }
  }
);


module.exports = mongoose.model("EncuestasContestadas", EncuestaCSchema);
