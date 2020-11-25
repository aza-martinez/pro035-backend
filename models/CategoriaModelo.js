"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriasSchema = Schema(
  {
    numeroGuia: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    dominios: [{ type: Schema.ObjectId, ref: "Dominios" }],
    preguntas: [{ type: Schema.ObjectId, ref: "Preguntas" }],
    enumeracion: {
      type: Number,
      required: true,
    },
    nivelesRiesgo: [
      {
        nivel: String,
        minimo: Number,
        maximo: Number,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Categorias", CategoriasSchema);
