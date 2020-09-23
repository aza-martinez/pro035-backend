"use strict";

const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    apellidoPaterno: {
      type: String,
      trim: true,
      required: true,
    },
    apellidoMaterno: {
      type: String,
      trim: true,
      required: true,
    },
    genero: {
      type: String,
      trim: true,
    },
    rangoEdad: {
      type: String,
      trim: true,
    },
    estadoCivil: {
      type: String,
      trim: true,
    },
    nivelEstudios: {
      type: String,
      trim: true,
    },
    tipoPuesto: {
      type: String,
      trim: true,
    },
    tipoContratacion: {
      type: String,
      trim: true,
    },
    tipoPersonal: {
      type: String,
      trim: true,
    },
    tipoJornada: {
      type: String,
      trim: true,
    },
    rolarTurnos: {
      type: String,
      trim: true,
      maxlength: 2,
    },
    experienciaPuestoActual: {
      type: String,
      trim: true,
    },
    tiempoExperienciaLaboral: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    perfil: {
      type: String,
      trim: true,
      enum: ["Administrador", "Empleado"],
      required: true,
    },
    usuario: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    firstLogin: {
      type: Boolean,
      default: true,
    },
    timestamp: {
      type: Date,
      default: Date.now(),
    },
    encuestasPendientes: {
      type: Array,
    },
    cliente: {
      type: mongoose.Schema.ObjectId,
      ref: "Cliente",
      required: true,
    },
    centroTrabajo: { type: mongoose.Schema.ObjectId, ref: "CentrosTrabajo" },
    empresa: { type: mongoose.Schema.ObjectId, ref: "Empresa" },
    puesto: { type: mongoose.Schema.ObjectId, ref: "Puesto" },
    estatus: {
      type: Boolean,
      default: true,
    },
    areaTrabajo: {
      type: mongoose.Schema.ObjectId,
      ref: "AreasTrabajo",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Usuario", UsuariosSchema);
