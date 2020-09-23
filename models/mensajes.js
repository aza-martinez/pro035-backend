"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MensajesSchema = Schema(
  {
    mensaje: String,
    numGuia: String,
    orden: String,
    timestamp: Date,
    plural: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Mensajes", MensajesSchema);
