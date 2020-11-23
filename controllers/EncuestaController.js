"use strict";

const EncuestaModelo = require("./../models/EncuestaModelo");
const CategoriaModelo = require("../models/CategoriaModelo");
const DominioModelo = require("../models/DominioModelo");
const DimensionModelo = require("./../models/DimensionModelo");
const PreguntaModelo = require("./../models/PreguntasModelo");
const RespuestasModelo = require("./../models/RespuestasModelo");
const PeriodoEvaluacionModelo = require("./../models/PeriodoEvaluacionModelo");
const validarUsuario = require("./../helpers/validarUsuario");
const EncuestaController = {
  Query: {
    obtenerEncuestaPorNumeracion: async (
      _,
      { numeroEncuesta },
      { usuario }
    ) => {
      await validarUsuario(usuario, "Any");

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
    obtenerEncuestasPendientesUsuario: async (_, __, { usuario }) => {
      const { cliente, dataUsuario } = await validarUsuario(usuario, "Any");

      const periodoEvaluacion = await PeriodoEvaluacionModelo.findOne(
        {
          $and: [
            { cliente },
            { estatus: "Pendiente" },
            { "empleados.empleado": dataUsuario._id },
          ],
        },
        { empleados: 1, _id: 0 }
      );

      if (!periodoEvaluacion)
        throw new Error("No se encontraron encuestas pendientes");

      const empleado = periodoEvaluacion.empleados.find(
        (empleado) => empleado.empleado == dataUsuario._id.toString()
      );

      const encuestas = empleado.encuestas.filter(
        ({ estatus }) => estatus == "Pendiente"
      );

      return encuestas;
    },
  },
  Mutation: {},
};

module.exports = EncuestaController;
