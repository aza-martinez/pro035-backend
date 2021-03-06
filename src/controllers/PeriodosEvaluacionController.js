const PeriodoEvaluacionModelo = require("./../models/PeriodoEvaluacionModelo");
const validarUsuario = require("../helpers/validarUsuario");
const UsuarioModelo = require("./../models/user.model");
const CentroTrabajoModelo = require("./../models/CentroTrabajoModelo");
const EmpresaModelo = require("./../models/empresas");

const PeriodoEvaluacionController = {
  Query: {
    obtenerPeriodosEvaluacion: async (
      _,
      { empresa, centroTrabajo },
      { usuario }
    ) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const periodosEvaluacion = await PeriodoEvaluacionModelo.find({
        $and: [{ cliente }, { $or: [{ empresa }, { centroTrabajo }] }],
      }).populate([
        {
          path: "centroTrabajo",
          model: CentroTrabajoModelo,
        },
        {
          path: "empleados.empleado",
          model: UsuarioModelo,
        },
      ]);

      if (!periodosEvaluacion)
        throw new Error("No se ha podido obtener los periodos de evaluación.");

      return periodosEvaluacion;
    },
    obtenerPeriodoEvaluacion: async (_, { id }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const periodoEvaluacion = await PeriodoEvaluacionModelo.findOne({
        $and: [{ cliente }, { _id: id }],
      }).populate([
        {
          path: "centroTrabajo",
          model: CentroTrabajoModelo,
        },
        {
          path: "empleados.empleado",
          model: UsuarioModelo,
        },
      ]);

      if (!periodoEvaluacion)
        throw new Error("No se ha encontrado Periodo Evaluacion");

      return periodoEvaluacion;
    },
    obtenerPeriodoEvaluacionPorUsuario: async (_, __, { usuario }) => {
      const { cliente, dataUsuario } = await validarUsuario(usuario, "Any");

      const periodoEvaluacion = await PeriodoEvaluacionModelo.findOne({
        $and: [
          { "empleados.empleado": { $eq: dataUsuario._id } },
          { estatus: "Pendiente" },
          { cliente },
        ],
      });

      return periodoEvaluacion;
    },
  },
  Mutation: {
    registrarPeriodoEvaluacion: async (_, { input }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const existePeriodo = await PeriodoEvaluacionModelo.exists({
        $and: [
          { cliente },
          { empresa: input.empresa },
          { nombre: input.nombre },
        ],
      });

      if (existePeriodo)
        throw new Error(
          "Ya existe un Período Evaluación con el mismo nombre. Intenta con otro."
        );

      input.cliente = cliente;

      const periodoEvaluacion = new PeriodoEvaluacionModelo(input);
      let response = periodoEvaluacion.save();

      if (!response)
        throw new Error("Ha ocurrido un error al registrar Período Evaluación");

      const responsePopulated = await periodoEvaluacion
        .populate([
          {
            path: "centroTrabajo",
            model: CentroTrabajoModelo,
          },
          {
            path: "empleados",
            model: UsuarioModelo,
          },
          {
            path: "empresa",
            model: EmpresaModelo,
          },
        ])
        .execPopulate();

      console.log(responsePopulated);

      return responsePopulated;
    },
  },
};

module.exports = PeriodoEvaluacionController;
