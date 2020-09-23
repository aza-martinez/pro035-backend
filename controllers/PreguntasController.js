"use strict";
require("dotenv").config({ path: "variables.env" });

const PreguntaModelo = require("./../models/PreguntasModelo");
const CategoriaModelo = require("./../models/CategoriaModelo");
const DominioModelo = require("./../models/DominioModelo");
const DimensionModelo = require("./../models/DimensionModelo");
const MensajeModelo = require("./../models/mensajes");
const RespuestaModelo = require("./../models/RespuestasModelo");
const validarUsuario = require("../helpers/validarUsuario");

const PreguntaController = {
  Query: {
    obtenerPreguntasPorEncuesta: async (_, { numeroEncuesta }, { usuario }) => {
      await validarUsuario(usuario, "Any");

      const preguntas = await PreguntaModelo.find({
        numeroGuia: numeroEncuesta.toString(),
      })
        .sort("enumeracion")
        .populate([
          {
            path: "categoria",
            model: CategoriaModelo,
          },
          {
            path: "dimension",
            model: DimensionModelo,
          },
          {
            path: "dominio",
            model: DominioModelo,
          },
          {
            path: "mensaje",
            model: MensajeModelo,
          },
          {
            path: "respuestas",
            model: RespuestaModelo,
          },
        ]);

      if (!preguntas) throw new Error("No fue posible obtener las preguntas");

      return preguntas;
    },
  },
};
module.exports = PreguntaController;
