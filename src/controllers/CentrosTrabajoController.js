"use strict";

const CentroTrabajoModelo = require("../models/CentroTrabajoModelo");
const validarUsuario = require("./../helpers/validarUsuario");

const CentroTrabajoController = {
  Query: {
    obtenerCentrosTrabajo: async (_, { empresa }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const centrosTrabajo = await CentroTrabajoModelo.find({
        $and: [{ empresa }, { cliente }, { estatus: true }],
      });

      if (!centrosTrabajo)
        throw new Error("No se ha podido obtener Centros Trabajo");

      return centrosTrabajo;
    },
  },
  Mutation: {
    agregarCentroTrabajo: async (_, { input }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const existeCentroTrabajo = await CentroTrabajoModelo.findOne({
        $and: [
          { nombre: input.nombre },
          { empresa: input.empresa },
          { cliente },
          { estatus: true },
        ],
      });

      if (existeCentroTrabajo)
        throw new Error(
          "Ya existe un Centro Trabajo con ese nombre. Intente con otro."
        );

      input.cliente = cliente;
      const centroTrabajoNuevo = new CentroTrabajoModelo(input);

      const response = await centroTrabajoNuevo.save();

      if (!response)
        throw new Error("No se ha podido guardar el Centro Trabajo.");

      return response;
    },
    actualizarCentroTrabajo: async (_, { id, input }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      // Validamos que no exista ningun centro de trabajo con el mismo nombre
      // y que pertenezca a la misma empresa
      const existeCentroTrabajo = await CentroTrabajoModelo.findOne({
        $and: [
          { nombre: input.nombre },
          { _id: { $nin: [id] } },
          { empresa: input.empresa },
          { estatus: true },
          { cliente },
        ],
      });

      if (existeCentroTrabajo)
        throw new Error(
          "Ya existe un Centro trabajo con ese nombre, intente con otro."
        );
          
      let centroTrabajo = await CentroTrabajoModelo.findById(id);

      if (!centroTrabajo) throw new Error("Centro trabajo no existe.");

      if (centroTrabajo.empresa != input.empresa)
        throw new Error("Error en las credenciales.");

      centroTrabajo = await CentroTrabajoModelo.findByIdAndUpdate(
        { _id: id },
        input,
        {
          new: true,
        }
      );

      return centroTrabajo;
    },
  },
};

module.exports = CentroTrabajoController;
