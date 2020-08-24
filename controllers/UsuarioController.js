require("dotenv").config({ path: "variables.env" });
const bcryptjs = require("bcryptjs");
const UsuarioModelo = require("../models/UsuarioModelo");
const validarUsuario = require("../helpers/validarUsuario");
const CentroTrabajoModelo = require("./../models/CentroTrabajoModelo");
const PuestosModelo = require("./../models/PuestosModelo");
const { findOne } = require("../models/UsuarioModelo");

const UsuarioController = {
  Query: {
    obtenerUsuarios: async (_, { empresa }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const usuarios = await UsuarioModelo.find({
        $and: [
          { empresa },
          { cliente },
          { perfil: "Empleado" },
          { estatus: true },
        ],
      }).populate({
        path: "puesto",
        model: PuestosModelo,
      });

      return usuarios;
    },
    obtenerUsuarioPorId: async (_, { id, empresa }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const empleado = await UsuarioModelo.findOne({
        $and: [{ cliente }, { empresa }, { estatus: true }, { _id: id }],
      }).populate({
        path: "puesto",
        model: PuestosModelo,
      });

      if (!empleado)
        throw new Error("No existe el usuario que intenta obtener.");

      return empleado;
    },
    obtenerUsuarioAutenticado: async (_, __, { usuario }) => {
      const { usuario: user } = await validarUsuario(usuario, "Any");

      const usuarioAutenticado = await UsuarioModelo.findOne({
        $or: [{ email: user }, { usuario: user }],
      });

      if (!usuarioAutenticado)
        throw new Error("No se ha podido obtener al usuario");

      return usuarioAutenticado;
    },
    obtenerUsuariosPorCentroTrabajo: async (
      _,
      { centroTrabajo, empresa },
      { usuario }
    ) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      // validar si existe centro trabajo
      const existeCentroTrabajo = await CentroTrabajoModelo.exists({
        $and: [{ _id: centroTrabajo }, { estatus: true }],
      });

      if (!existeCentroTrabajo)
        throw new Error("No existe el centro de tarabajo proporcionado");

      const usuarios = await UsuarioModelo.find({
        $and: [{ empresa }, { cliente }, { estatus: true }, { centroTrabajo }],
      }).populate({
        path: "puesto",
        model: PuestosModelo,
      });

      if (!usuarios) throw new Error("No se ha podido obtener empleados.");

      return usuarios;
    },
  },
  Mutation: {
    nuevoUsuario: async (_, { input }, { usuario: userActivo }) => {
      const { cliente } = await validarUsuario(userActivo, "Administrador");
      const { usuario, email, password } = input;

      //verificando si existe usuario
      const usuarioExiste = await UsuarioModelo.findOne({
        $or: [{ email }, { usuario }],
      });

      if (usuarioExiste)
        throw new Error(
          "El usuario que intenta registrar ya está en uso, intenta con otro."
        );

      // Hasheamos password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      // Instanciamos nuevo usuario y lo guardamos
      input.cliente = cliente;
      const nuevoUsuario = new UsuarioModelo(input);
      const response = nuevoUsuario.save();

      if (!response) throw new Error("No se pudo registrar el usuario");

      const responsePopulated = await UsuarioModelo.populate(nuevoUsuario, {
        path: "puesto",
        model: PuestosModelo,
      });

      return responsePopulated;
    },
    actualizarUsuario: async (_, { id, input }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      let existeUsuario = await UsuarioModelo.exists({
        $and: [
          { empresa: input.empresa },
          { cliente },
          { estatus: true },
          { _id: id },
        ],
      });

      if (!existeUsuario)
        throw new Error("No existe usuario que intenta actualizar.");

      existeUsuario = await UsuarioModelo.exists({
        $and: [
          { empresa: input.empresa },
          { cliente },
          { estatus: true },
          { _id: { $nin: [id] } },
          { $or: [{ usuario: input.usuario }, { email: input.email }] },
        ],
      });

      if (existeUsuario)
        throw new Error(
          "Ya existe un empleado con el mismo usuario o email. Intenta con otro"
        );

      if (input.password) {
        // Hasheamos password
        const salt = await bcryptjs.genSalt(10);
        input.password = await bcryptjs.hash(input.password, salt);
      }

      const nuevoUsuario = await UsuarioModelo.findByIdAndUpdate(
        { _id: id },
        input,
        { new: true }
      );

      if (!nuevoUsuario)
        throw new Error("No se ha podido actualizar el usuario");

      const usuarioPopulate = await UsuarioModelo.populate(nuevoUsuario, {
        path: "puesto",
        model: PuestosModelo,
      });

      return usuarioPopulate;
    },
  },
};

module.exports = UsuarioController;
