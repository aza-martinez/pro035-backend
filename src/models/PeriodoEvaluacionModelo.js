"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmpleadosPeriodoEvaluacion = new Schema({
  empleado: {
    type: Schema.ObjectId,
    ref: "Usuario",
  },
  encuestas: [],
});

const PeriodoEvaluacionSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    rangoEmpleados: {
      type: String,
      required: true,
      enum: ["0 - 15", "16 - 50", "Más de 50"],
      trim: true,
    },
    centroTrabajo: {
      type: mongoose.Schema.ObjectId,
      ref: "CentrosTrabajo",
    },
    estatus: {
      type: String,
      trim: true,
      enum: ["Pendiente", "En proceso", "Finalizado"],
      default: "Pendiente",
    },
    empleados: [EmpleadosPeriodoEvaluacion],
    creado: {
      type: Date,
      default: Date.now(),
    },
    fechaPendiente: {
      type: Date,
      default: Date.now(),
    },
    fechaEnProceso: {
      type: Date,
    },
    fechaFinalizado: {
      type: Date,
    },
    empresa: {
      type: mongoose.Schema.ObjectId,
      ref: "Empresa",
    },
    cliente: {
      type: mongoose.Schema.ObjectId,
      ref: "Cliente",
    },
    encuestas: {
      type: [Number],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("PeriodosEvaluacion", PeriodoEvaluacionSchema);
