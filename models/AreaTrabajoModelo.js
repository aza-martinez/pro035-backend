"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO:FECHA MEXICO
const AreasTrabajoSchema = Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
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
    empleados: [
      {
        type: Schema.ObjectId,
        ref: "Empleados",
      },
    ],
    centrosTrabajo: [
      {
        type: Schema.ObjectId,
        ref: "CentrosTrabajo",
      },
    ],
    empresa: {
      type: Schema.ObjectId,
      ref: "Empresa",
      required: true,
    },
    cliente: {
      type: Schema.ObjectId,
      ref: "Cliente",
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("AreasTrabajo", AreasTrabajoSchema);
