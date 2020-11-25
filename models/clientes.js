"use strict";

const mongoose = require("mongoose");

const ClientesSchema = mongoose.Schema(
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
    calle: {
      type: String,
      trim: true,
    },
    colonia: {
      type: String,
      trim: true,
    },
    cp: {
      type: String,
      trim: true,
    },
    rfc: {
      type: String,
      trim: true,
      minLength: [12, "RFC no válido"],
      maxLength: [13, "RFC no válido"],
    },
    estatus: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Cliente", ClientesSchema);
