"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RespuestasSchema = Schema(
  {
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    valor: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Respuestas", RespuestasSchema);
