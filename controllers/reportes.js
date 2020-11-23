const mongoose = require("mongoose");

const PeriodoEvaluacionModelo = require("./../models/PeriodoEvaluacionModelo");
const CategoriaModelo = require("./../models/CategoriaModelo");
const DominioModelo = require("./../models/DominioModelo");
const DimensionModelo = require("./../models/DimensionModelo");
const validarUsuario = require("../helpers/validarUsuario");
const UsuarioModelo = require("../models/UsuarioModelo");

// CT  = CENTRO TRABAJO
const reportesController = {
  Query: {
    reporteEntornoOrganizacionalCT: async (
      _,
      { numeroGuia, periodoEvaluacion },
      { usuario }
    ) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const idPeriodoEvaluacion = mongoose.Types.ObjectId(periodoEvaluacion);
      const idCliente = mongoose.Types.ObjectId(cliente);

      const filtered = await PeriodoEvaluacionModelo.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$_id", idPeriodoEvaluacion] },
                { $eq: ["$cliente", idCliente] },
                { $in: [parseInt(numeroGuia), "$encuestas"] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: "encuestas",
            as: "encuesta",
            let: { numeroGuia },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$numeroEncuesta", "$$numeroGuia"],
                  },
                },
              },
            ],
          },
        },
        { $unwind: "$encuesta" },
        {
          $lookup: {
            from: "encuestascontestadas",
            as: "encuestasContestadas",
            let: { periodoEvaluacion: "$_id", numeroGuia },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$periodoEvaluacion", "$$periodoEvaluacion"] },
                      { $eq: ["$numeroGuia", "$$numeroGuia"] },
                      { $ne: ["$categoria", ""] },
                    ],
                  },
                },
              },
              {
                $lookup: {
                  from: "usuarios",
                  let: { empleado_id: "$empleado" },
                  as: "empleado",
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$empleado_id"] } } },
                  ],
                },
              },
              { $unwind: "$empleado" },
            ],
          },
        },
        {
          $lookup: {
            from: "centrostrabajos",
            localField: "centroTrabajo",
            foreignField: "_id",
            as: "centroTrabajo",
          },
        },
        { $unwind: { path: "$centroTrabajo" } },
        {
          $lookup: {
            from: "empresas",
            localField: "empresa",
            foreignField: "_id",
            as: "empresa",
          },
        },
        { $unwind: { path: "$empresa" } },
        {
          $lookup: {
            from: "categorias",
            as: "categorias",
            let: { numeroGuia },
            pipeline: [
              { $match: { $expr: { $eq: ["$numeroGuia", "$$numeroGuia"] } } },
            ],
          },
        },
        {
          $lookup: {
            from: "dominios",
            as: "dominios",
            let: { numeroGuia },
            pipeline: [
              { $match: { $expr: { $eq: ["$numeroGuia", "$$numeroGuia"] } } },
            ],
          },
        },
      ]);

      const populated = await PeriodoEvaluacionModelo.populate(filtered, [
        {
          path: "encuestasContestadas.respuestas.categoria",
          model: CategoriaModelo,
        },
        {
          path: "encuestasContestadas.respuestas.dominio",
          model: DominioModelo,
        },
        {
          path: "encuestasContestadas.respuestas.dimension",
          model: DimensionModelo,
        },
        {
          path: "empleados.empleado",
          model: UsuarioModelo,
        },
      ]);

      return populated[0];
    },
    reporteAreaTrabajo: async (
      _,
      { periodoEvaluacion, numeroGuia, areaTrabajo },
      { usuario }
    ) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const idPeriodoEvaluacion = mongoose.Types.ObjectId(periodoEvaluacion);
      const idCliente = mongoose.Types.ObjectId(cliente);
      const idAreaTrabajo = mongoose.Types.ObjectId(areaTrabajo);

      const filtered = await PeriodoEvaluacionModelo.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$_id", idPeriodoEvaluacion] },
                { $eq: ["$cliente", idCliente] },
                { $in: [parseInt(numeroGuia), "$encuestas"] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: "encuestas",
            as: "encuesta",
            let: { numeroGuia },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$numeroEncuesta", "$$numeroGuia"],
                  },
                },
              },
            ],
          },
        },
        { $unwind: "$encuesta" },
        {
          $lookup: {
            from: "encuestascontestadas",
            as: "encuestasContestadas",
            let: { periodoEvaluacion: "$_id", numeroGuia },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$periodoEvaluacion", "$$periodoEvaluacion"] },
                      { $eq: ["$numeroGuia", "$$numeroGuia"] },
                      { $ne: ["$categoria", ""] },
                    ],
                  },
                },
              },
              {
                $lookup: {
                  from: "usuarios",
                  let: { empleado_id: "$empleado" },
                  as: "empleado",
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$empleado_id"] } } },
                  ],
                },
              },
              { $unwind: "$empleado" },
            ],
          },
        },
        {
          $lookup: {
            from: "centrostrabajos",
            localField: "centroTrabajo",
            foreignField: "_id",
            as: "centroTrabajo",
          },
        },
        { $unwind: { path: "$centroTrabajo" } },
        {
          $lookup: {
            from: "empresas",
            localField: "empresa",
            foreignField: "_id",
            as: "empresa",
          },
        },
        { $unwind: { path: "$empresa" } },
        {
          $lookup: {
            from: "categorias",
            as: "categorias",
            let: { numeroGuia },
            pipeline: [
              { $match: { $expr: { $eq: ["$numeroGuia", "$$numeroGuia"] } } },
            ],
          },
        },
        {
          $lookup: {
            from: "dominios",
            as: "dominios",
            let: { numeroGuia },
            pipeline: [
              { $match: { $expr: { $eq: ["$numeroGuia", "$$numeroGuia"] } } },
            ],
          },
        },
        {
          $project: {
            estatus: 1,
            nombre: 1,
            creado: 1,
            rangoEmpleados: 1,
            centroTrabajo: 1,
            empresa: 1,
            encuestas: 1,
            categorias: 1,
            dominios: 1,
            empleados: 1,
            encuesta: 1,
            encuestasContestadas: {
              $filter: {
                input: "$encuestasContestadas",
                as: "encuesta",
                cond: {
                  $eq: [
                    "$$encuesta.empleado.areaTrabajo",
                    idAreaTrabajo,
                  ],
                },
              },
            },
          },
        },
      ]);

      const populated = await PeriodoEvaluacionModelo.populate(filtered, [
        {
          path: "encuestasContestadas.respuestas.categoria",
          model: CategoriaModelo,
        },
        {
          path: "encuestasContestadas.respuestas.dominio",
          model: DominioModelo,
        },
        {
          path: "encuestasContestadas.respuestas.dimension",
          model: DimensionModelo,
        },
        {
          path: "empleados.empleado",
          model: UsuarioModelo,
        },
      ]);

      return populated[0];
    },
  },
};

module.exports = reportesController;
