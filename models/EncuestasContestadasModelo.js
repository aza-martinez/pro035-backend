"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EncuestaCSchema = Schema(
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
      type: Boolean
    },
    respuestas: [],
  },
  { versionKey: false }
);

module.exports = mongoose.model("EncuestasContestadas", EncuestaCSchema);
