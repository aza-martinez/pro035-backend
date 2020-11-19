const EncuestasContestadasModelo = require("./../models/EncuestasContestadasModelo");
const EncuestaModelo = require("../models/EncuestaModelo");
const validarUsuario = require("../helpers/validarUsuario");
const UsuarioModelo = require("../models/UsuarioModelo");
const PeriodoEvaluacionModelo = require("../models/PeriodoEvaluacionModelo");
const CategoriaModelo = require("./../models/CategoriaModelo");
const PreguntaModelo = require("./../models/PreguntasModelo");
const EmpresaModelo = require("./../models/empresas");
const PuestoModelo = require("./../models/PuestosModelo");
const AreaTrabajoModelo = require("../models/AreaTrabajoModelo");
const MensajeModelo = require("./../models/mensajes");
const CentroTrabajoModelo = require("../models/CentroTrabajoModelo");
const DominioModelo = require("../models/DominioModelo");

const EncuestasContestadasController = {
  Query: {
    obtenerEncuestasContestadaPE: async (
      _,
      { periodoEvaluacion, numeroGuia },
      { usuario }
    ) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const encuestaContestada = await EncuestasContestadasModelo.find({
        $and: [{ periodoEvaluacion }, { numeroGuia }],
      }).populate([
        {
          path: "empleado",
          model: UsuarioModelo,
          populate: [
            {
              path: "puesto",
              model: PuestoModelo,
            },
            {
              path: "areaTrabajo",
              model: AreaTrabajoModelo,
            },
            {
              path: "centroTrabajo",
              model: CentroTrabajoModelo,
            },
          ],
        },
        {
          path: "respuestas.categoria",
          model: CategoriaModelo,
        },
        {
          path: "periodoEvaluacion",
          model: PeriodoEvaluacionModelo,
          populate: {
            path: "empresa",
            model: EmpresaModelo,
          },
        },
        {
          path: "respuestas.pregunta",
          model: PreguntaModelo,
          populate: {
            path: "mensaje",
            model: MensajeModelo,
          },
        },
      ]);

      if (!encuestaContestada)
        throw new Error("No se han encontrado resultados");

      return encuestaContestada;
    },
    obtenerEncuestaContestadaEmpleado: async (_, { input }, { usuario }) => {
      await validarUsuario(usuario, "Administrador");
      const { encuesta, periodoEvaluacion, empleado } = input;

      const encuestaContestada = await EncuestasContestadasModelo.findOne({
        $and: [{ periodoEvaluacion }, { empleado }, { numeroGuia: encuesta }],
      }).populate([
        {
          path: "empleado",
          model: UsuarioModelo,
          populate: [
            {
              path: "puesto",
              model: PuestoModelo,
            },
            {
              path: "areaTrabajo",
              model: AreaTrabajoModelo,
            },
            {
              path: "centroTrabajo",
              model: CentroTrabajoModelo,
            },
          ],
        },
        {
          path: "respuestas.categoria",
          model: CategoriaModelo,
        },
        {
          path: "respuestas.dominio",
          model: DominioModelo,
        },
        {
          path: "periodoEvaluacion",
          model: PeriodoEvaluacionModelo,
          populate: {
            path: "empresa",
            model: EmpresaModelo,
          },
        },
        {
          path: "respuestas.pregunta",
          model: PreguntaModelo,
          populate: {
            path: "mensaje",
            model: MensajeModelo,
          },
        },
      ]);

      if (!encuestaContestada)
        throw new Error("No se ha podido generar el reporte.");

      return encuestaContestada;
    },
  },
  Mutation: {
    contestarEncuesta: async (_, { input, numeroEncuesta }, { usuario }) => {
      const { cliente, dataUsuario } = await validarUsuario(usuario, "Any");

      const periodoEvaluacion = await PeriodoEvaluacionModelo.exists({
        _id: input.periodoEvaluacion,
      });

      if (!periodoEvaluacion)
        throw new Error("Periodo Evaluación no encontrado");

      input.empleado = dataUsuario.id;
      input.numeroGuia = numeroEncuesta;

      const Encuesta = new EncuestasContestadasModelo(input);

      const EncuestaNueva = await Encuesta.save();

      if (!EncuestaNueva) throw new Error("No se ha podido registrar encuesta");

      const updated = await PeriodoEvaluacionModelo.update(
        { _id: input.periodoEvaluacion },
        {
          $set: {
            "empleados.$[empl].encuestas.$[enc].estatus": "Contestada",
          },
        },
        {
          arrayFilters: [
            { "empl.empleado": input.empleado },
            { "enc.numeroGuia": numeroEncuesta },
          ],
        }
      );

      return EncuestaNueva;
    },
  },
};

module.exports = EncuestasContestadasController;
