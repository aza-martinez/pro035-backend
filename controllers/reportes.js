const mongoose = require("mongoose");
const EncuestasContestadas = require("./../models/EncuestasContestadasModelo");
const PeriodoEvaluacionModelo = require("./../models/PeriodoEvaluacionModelo");
const CategoriaModelo = require("./../models/CategoriaModelo");
const UsuarioModelo = require("../models/UsuarioModelo");
const CentroTrabajoModelo = require('./../models/CentroTrabajoModelo')
const reportesController = {
  Query: {
    reporteCentroTrabajo: async (
      _,
      { numeroGuia, periodoEvaluacion },
      { usuario }
    ) => {
      const idPeriodo = mongoose.Types.ObjectId(periodoEvaluacion);
      const filtered = await PeriodoEvaluacionModelo.aggregate([
        { $match: { _id: idPeriodo } },
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
                    ],
                  },
                },
              },
            ],
          },
        },
      ]);

      const populated = await PeriodoEvaluacionModelo.populate(filtered, [
        {
          path: 'centroTrabajo',
          model: CentroTrabajoModelo
        },
        {
          path: "encuestasContestadas.empleado",
          model: UsuarioModelo,
        },
        {
          path: "encuestasContestadas.categoria",
          model: CategoriaModelo,
        },
      ]);

      return populated[0];
    },
  },
};

module.exports = reportesController;
