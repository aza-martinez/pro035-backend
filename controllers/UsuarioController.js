const bcryptjs = require("bcryptjs");
const UsuarioModelo = require("../models/UsuarioModelo");
const validarUsuario = require("../helpers/validarUsuario");
const CentroTrabajoModelo = require("./../models/CentroTrabajoModelo");
const PuestosModelo = require("./../models/PuestosModelo");
const EmpresaModelo = require("./../models/empresas");
const AreaTrabajoModelo = require("../models/AreaTrabajoModelo");

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
      }).populate([
        {
          path: "puesto",
        },
        {
          path: "centroTrabajo",
        },
      ]);

      return usuarios;
    },
    obtenerUsuarioPorId: async (_, { id, empresa }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const empleado = await UsuarioModelo.findOne({
        $and: [{ cliente }, { empresa }, { estatus: true }, { _id: id }],
      }).populate([
        {
          path: "puesto",
          model: PuestosModelo,
        },
        {
          path: "empresa",
          model: EmpresaModelo,
        },
        {
          path: "centroTrabajo",
          model: CentroTrabajoModelo,
        },
        {
          path: "areaTrabajo",
          model: AreaTrabajoModelo,
        },
      ]);

      if (!empleado)
        throw new Error("No existe el usuario que intenta obtener.");

      return empleado;
    },
    obtenerUsuarioAutenticado: async (_, __, { usuario }) => {
      const { usuario: user } = await validarUsuario(usuario, "Any");

      const usuarioAutenticado = await UsuarioModelo.findOne({
        $or: [{ email: user }, { usuario: user }],
      }).populate([
        {
          path: "empresa",
          model: EmpresaModelo,
        },
        {
          path: "puesto",
          model: PuestosModelo,
        },
        {
          path: "areaTrabajo",
          model: AreaTrabajoModelo,
        },
        {
          path: "centroTrabajo",
          model: CentroTrabajoModelo,
        },
      ]);

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
      const { cliente } = await validarUsuario(usuario, "Any");

      let existeUsuario = await UsuarioModelo.exists({
        $and: [{ cliente }, { estatus: true }, { _id: id }],
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
    eliminarUsuario: async (_, input, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      let user = await UsuarioModelo.exists({ _id: input.usuario, cliente });

      if (!user) throw new Error("Usuario no encontrado");

      const data = { estatus: false, fechaBaja: new Date() };
      user = await UsuarioModelo.findByIdAndUpdate(
        { _id: input.usuario },
        data
      );

      if (!user) throw new Error("No hemos podido eliminar el usuario.");

      return true;
    },
  },
};

module.exports = UsuarioController;
