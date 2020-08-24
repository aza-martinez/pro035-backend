"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DominioSchema = Schema(
  {
    numeroGuia: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    timestamp: {
      type: Date,
    },
    dimensiones: [{ type: Schema.ObjectId, ref: "Dimensiones" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Dominios", DominioSchema);
