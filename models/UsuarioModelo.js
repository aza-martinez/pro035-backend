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
    sexo: {
      type: String,
      trim: true,
      enum: ["Masculino", "Femenino"],
    },
    edad: {
      type: Number,
      max: [2, "Edad no válida"],
    },
    estadoCivil: {
      type: String,
      trim: true,
      enum: ["Casado", "Divorciado", "Soltero", "Unión Libre", "Viudo"],
    },
    nivelEstudios: {
      type: String,
      trim: true,
      enum: [
        "Sin formación",
        "Primaria",
        "Secundaria",
        "Preparatoria o Bachillerato",
        "Técnico Superior",
        "Licenciatura",
        "Maestría",
        "Doctorado",
      ],
    },
    tipoPuesto: {
      type: String,
      trim: true,
      enum: ["Operativo", "Profesional o técnico"],
    },
    tipoContratacion: {
      type: String,
      trim: true,
      enum: [
        "Por obra o proyecto",
        "Por tiempo determinado (temporal)",
        "Tiempo indeterminado",
        "Honorarios",
      ],
    },
    tipoPersonal: {
      type: String,
      trim: true,
      enum: ["Sindicalizado", "Confianza", "Ninguno"],
    },
    tipoJornada: {
      type: String,
      trim: true,
      enum: [
        "Fijo nocturno (entre las 20:00 y 6:00 hrs)",
        "Fijo diurno (entre las 6:00 y 20:00 hrs",
        "Fijo mixto (combinación de nocturno y diurno)",
      ],
    },
    rolarTurnos: {
      type: String,
      trim: true,
      enum: ["Si", "No"],
      maxlength: 2,
    },
    experienciaPuestoActual: {
      type: String,
      trim: true,
      enum: [
        "Menos de 6 meses",
        "Entre 6 meses y 1 año",
        "Entre 1 y 4 años",
        "Entre 5 y 9 años",
        "Entre 10 a 14 años",
        "Entre 15 a 19 años",
        "Entre 20 a 24 años",
        "25 años o más",
      ],
    },
    tiempoExperienciaLaboral: {
      type: String,
      trim: true,
      enum: [
        "Menos de 6 meses",
        "Entre 6 meses y 1 año",
        "Entre 1 y 4 años",
        "Entre 5 y 9 años",
        "Entre 10 a 14 años",
        "Entre 15 a 19 años",
        "Entre 20 a 24 años",
        "25 años o más",
      ],
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
    centroTrabajo: {type: mongoose.Schema.ObjectId, ref: 'CentrosTrabajo'},
    empresa: { type: mongoose.Schema.ObjectId, ref: "Empresa" },
    puesto: { type: mongoose.Schema.ObjectId, ref: "Puesto" },
    estatus: {
      type: Boolean,
      default: true  
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Usuario", UsuariosSchema);
