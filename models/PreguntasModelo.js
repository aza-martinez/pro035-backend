"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreguntasSchema = Schema(
  {
    numeroGuia: {
      type: String,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    timestamp: Date,
    enumeracion: {
      type: Number,
      required: true,
    },
    respuestas: [{ type: Schema.ObjectId, ref: "Respuestas" }],
    categoria: {
      type: Schema.ObjectId,
      ref: "Categorias",
    },
    dominio: {
      type: Schema.ObjectId,
      ref: "Dominios",
    },
    dimension: {
      type: Schema.ObjectId,
      ref: "Dimensiones",
    },
    mensaje: {
      type: Schema.ObjectId,
      ref: "Mensajes",
    },
    dependencias: {
      type: [Number],
    },
    field: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Preguntas", PreguntasSchema);
