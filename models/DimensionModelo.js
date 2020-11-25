"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DimensionesSchema = Schema(
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
    preguntas: [{ type: Schema.ObjectId, ref: "Preguntas" }],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Dimensiones", DimensionesSchema);
