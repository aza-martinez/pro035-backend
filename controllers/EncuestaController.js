"use strict";
require("dotenv").config({ path: "variables.env" });

const EncuestaModelo = require("./../models/EncuestaModelo");
const CategoriaModelo = require("../models/CategoriaModelo");
const DominioModelo = require("../models/DominioModelo");
const DimensionModelo = require("./../models/DimensionModelo");
const PreguntaModelo = require("./../models/PreguntasModelo");
const RespuestasModelo = require("./../models/RespuestasModelo");
const validarUsuario = require("./../helpers/validarUsuario");

const EncuestaController = {
  Query: {
    obtenerEncuestaPorNumeracion: async (
      _,
      { numeroEncuesta },
      { usuario }
    ) => {
      const { cliente, dataUsuario } = await validarUsuario(usuario, "Any");

      console.log(dataUsuario);

      const encuesta = await EncuestaModelo.findOne({
        numeroEncuesta,
      }).populate({
        path: "categorias",
        model: CategoriaModelo,
        populate: {
          path: "dominios",
          model: DominioModelo,
          populate: {
            path: "dimensiones",
            model: DimensionModelo,
            populate: {
              path: "preguntas",
              model: PreguntaModelo,
              populate: {
                path: "respuestas",
                model: RespuestasModelo,
              },
            },
          },
        },
      });

      if (!encuesta) throw new Error("No se ha podido obtener la encuesta");

      return encuesta;
    },
  },
  Mutation: {},
};

module.exports = EncuestaController;
