"use strict";

const EncuestaModelo = require("./../models/EncuestaModelo");
const CategoriaModelo = require("../models/CategoriaModelo");
const DominioModelo = require("../models/DominioModelo");
const DimensionModelo = require("./../models/DimensionModelo");
const PreguntaModelo = require("./../models/PreguntasModelo");
const RespuestasModelo = require("./../models/RespuestasModelo");
const PeriodoEvaluacionModelo = require("./../models/PeriodoEvaluacionModelo");
const validarUsuario = require("./../helpers/validarUsuario");
const mongoose = require("mongoose");

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
      const empleado = mongoose.Types.ObjectId(dataUsuario._id);

      const periodoEvaluacion = await PeriodoEvaluacionModelo.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $in: [empleado, "$empleados.empleado"] },
                { cliente },
                { estatus: "Pendiente" },
              ],
            },
          },
        },
        {
          $project: {
            empleado: {
              $filter: {
                input: "$empleados",
                as: "empleado",
                cond: {
                  $and: [
                    {
                      $eq: ["$$empleado.empleado", empleado],
                    },
                  ],
                },
              },
            },
            nombre: true,
            rangoEmpleados: true,
            estatus: true,
            _id: true,
          },
        },
        {
          $unwind: {
            path: "$empleado",
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                {
                  $in: ["Pendiente", "$empleado.encuestas.estatus"],
                },
              ],
            },
          },
        },
        {
          $project: {
            encuestas: {
              $filter: {
                input: "$empleado.encuestas",
                as: "encuesta",
                cond: {
                  $and: [
                    {
                      $eq: ["$$encuesta.estatus", "Pendiente"],
                    },
                  ],
                },
              },
            },
            nombre: true,
            rangoEmpleados: true,
            estatus: true,
            empleado: true,
            id: {
              $toObjectId: "$_id",
            },
          },
        },
        {
          $lookup: {
            from: "encuestas",
            as: "encuestas",
            localField: "encuestas.numeroGuia",
            foreignField: "numeroEncuesta",
          },
        },
      ]);

      if (!periodoEvaluacion)
        throw new Error("No se encontraron encuestas pendientes");

      return periodoEvaluacion;
    },
  },
  Mutation: {},
};

module.exports = EncuestaController;
