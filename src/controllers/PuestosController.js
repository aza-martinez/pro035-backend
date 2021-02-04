"use strict";

const PuestosModelo = require("./../models/job.model");
const validarUsuario = require("./../helpers/validarUsuario");

const PuestosController = {
  Query: {
    obtenerPuestos: async (_, { empresa }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Any");

      const puestos = await PuestosModelo.find({
        $and: [{ cliente }, { empresa }, { estatus: true }],
      });

      if (!puestos) throw new Error("No se ha podido obtener los puestos.");

      return puestos;
    },
    obtenerPuesto: async (_, { id, empresa }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const puesto = await PuestosModelo.findOne({
        $and: [{ empresa }, { cliente }, { estatus: true }, { _id: id }],
      });

      if (!puesto) throw new Error("El puesto que intenta buscar no existe");

      return puesto;
    },
  },
  Mutation: {
    agregarPuesto: async (_, { input }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const existePuesto = await PuestosModelo.exists({
        $and: [
          { cliente },
          { empresa: input.empresa },
          { nombre: input.nombre },
          { estatus: true },
        ],
      });

      if (existePuesto)
        throw new Error(
          "Ya existe un puesto con el mismo nombre. Intente con otro."
        );

      input.cliente = cliente;
      const puestoNuevo = new PuestosModelo(input);
      const response = await puestoNuevo.save();

      if (!response) throw new Error("No se ha podido agregar el Puesto.");

      return response;
    },
    actualizarPuesto: async (_, { input, id }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const existePuesto = await PuestosModelo.exists({
        $and: [{ cliente }, { _id: id }, { estatus: true }],
      });

      if (!existePuesto)
        throw new Error("El puesto que intenta actualizar no existe");

      const existeNombre = await PuestosModelo.exists({
        $and: [
          { nombre: input.nombre },
          { cliente },
          { empresa: input.empresa },
          { estatus: true },
          { _id: { $nin: [id] } },
        ],
      });

      if (existeNombre)
        throw new Error(
          "Ya existe un Puesto con el mismo nombre. Intenta con otro."
        );

      const response = await PuestosModelo.findOneAndUpdate(
        { _id: id },
        input,
        { new: true }
      );

      if (!response)
        throw new Error(
          "No se ha podido actualizar puesto. Intente nuevamente."
        );

      return response;
    },
  },
};

module.exports = PuestosController;
