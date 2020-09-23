require("dotenv").config({ path: "variables.env" });
const PeriodoEvaluacionModelo = require("./../models/PeriodoEvaluacionModelo");
const validarUsuario = require("../helpers/validarUsuario");
const UsuarioModelo = require("./../models/UsuarioModelo");
const CentroTrabajoModelo = require("./../models/CentroTrabajoModelo");

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
          path: "empleados",
          model: UsuarioModelo,
        },
      ]);

      if (!periodosEvaluacion)
        throw new Error("No se ha podido obtener los periodos de evaluación.");

      return periodosEvaluacion;
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

      const responsePopulated = await PeriodoEvaluacionModelo.populate(
        response,
        [
          {
            path: "centroTrabajo",
            model: CentroTrabajoModelo,
          },
          {
            path: "empleados",
            model: UsuarioModelo,
          },
        ]
      );

      console.log(responsePopulated);

      return responsePopulated;
    },
  },
};

module.exports = PeriodoEvaluacionController;
