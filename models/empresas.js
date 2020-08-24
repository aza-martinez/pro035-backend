"use strict";

const mongoose = require("mongoose");

const EmpresasSchema = mongoose.Schema(
  {
    razonSocial: {
      type: String,
      required: true,
      trim: true,
    },
    alias: {
      type: String,
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
      required: true,
    },
    cp: {
      type: String,
      trim: true,
    },
    rfc: {
      type: String,
      trim: true,
      minlength: [12, "RFC no válido"],
      maxlength: [13, "RFC no válido"],
    },
    estatus: {
      type: Boolean,
      default: true,
    },
    timestamp: {
      type: Date,
      default: Date.now(),
    },
    idCentro: [{ type: mongoose.Schema.ObjectId, ref: "Centro" }],
    idArea: [{ type: mongoose.Schema.ObjectId, ref: "Area" }],
    areas: [{ type: mongoose.Schema.ObjectId, ref: "Area" }],
    centrosTrabajo: [{ type: mongoose.Schema.ObjectId, ref: "Centro" }],
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Empresa", EmpresasSchema);
