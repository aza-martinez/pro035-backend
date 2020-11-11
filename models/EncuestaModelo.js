"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EncuestasSchema = Schema(
  {
    numeroEncuesta: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    totalPreguntas: {
      type: Number,
    },
    timestamp: {
      type: Date,
    },
    categorias: [
      {
        type: Schema.ObjectId,
        ref: "Categorias",
      },
    ],
    nivelesRiesgo: [
      {
        nivel: String,
        minimo: Number,
        maximo: Number,
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Encuestas", EncuestasSchema);
