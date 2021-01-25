const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    estatus: {
      type: Boolean,
      default: true,
    },
    cliente: {
      type: mongoose.Schema.ObjectId,
      ref: "Cliente",
      required: true,
    },
    empresa: {
      type: mongoose.Schema.ObjectId,
      ref: "Empresa",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Puesto", JobSchema);
