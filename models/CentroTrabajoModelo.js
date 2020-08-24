"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CentrosSchema = Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    direccion: {
      type: String,
      trim: true,
      required: true,
    },
    cp: {
      type: String,
      trim: true,
      required: true,
      maxLength: 5,
    },
    telefono: {
      type: String,
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
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "Empresa",
      required: true,
    },
    cliente: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    areasDeTrabajo: [{ type: Schema.ObjectId, ref: "Areas" }],
    periodosDeEvaluacion: [{ type: Schema.ObjectId, ref: "Periodos" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("CentrosTrabajo", CentrosSchema);
