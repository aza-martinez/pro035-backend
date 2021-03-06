"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MensajesSchema = Schema(
  {
    mensaje: String,
    numGuia: String,
    orden: String,
    plural: String,
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Mensajes", MensajesSchema);
