"use strict";

const mongoose = require("mongoose");

const PuestoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    estatus: {
      type: Boolean,
      default: true,
    },
    timestamp: {
      type: Date,
      default: Date.now(),
    },
    cliente: {
      type: mongoose.Schema.ObjectId,
      ref: "Cliente",
      required: true
    },
    empresa: {
      type: mongoose.Schema.ObjectId,
      ref: "Empresa",
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Puesto", PuestoSchema);
