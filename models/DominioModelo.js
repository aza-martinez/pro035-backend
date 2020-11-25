"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DominioSchema = Schema(
  {
    numeroGuia: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    dimensiones: [{ type: Schema.ObjectId, ref: "Dimensiones" }],
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

module.exports = mongoose.model("Dominios", DominioSchema);
