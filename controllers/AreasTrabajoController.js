require("dotenv").config({ path: "variables.env" });
const validarUsuario = require("./../helpers/validarUsuario");
const AreaTrabajoModelo = require("./../models/AreaTrabajoModelo");
const CentroTrabajoModelo = require("./../models/CentroTrabajoModelo");
const EmpresaModelo = require("./../models/empresas");

const AreaTrabajoController = {
  Query: {
    obtenerAreasTrabajo: async (_, { empresa }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const areasTrabajo = await AreaTrabajoModelo.find({
        $and: [{ empresa }, { cliente }, { estatus: true }],
      })
        .populate([{
          path: "empresa",
          model: EmpresaModelo,
        }, {
          path: 'centrosTrabajo',
          model: CentroTrabajoModelo
        }])

      if (!areasTrabajo) throw new Error("No se pudo obtener areas de trabajo");

      return areasTrabajo;
    },
    obtenerAreaTrabajo: async (_, { id, empresa }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const areaTrabajo = await AreaTrabajoModelo.findOne({
        $and: [{ empresa }, { _id: id }, { cliente }, { estatus: true }],
      }).populate([{
        path: "empresa",
        model: EmpresaModelo,
      }, {
        path: 'centrosTrabajo',
        model: CentroTrabajoModelo
      }]);

      if (!areaTrabajo) throw new Error("Area trabajo no existe.");

      return areaTrabajo;
    },
  },
  Mutation: {
    agregarAreaTrabajo: async (_, { input }, { usuario }) => {
      // VALIDAMOS SESION Y PERMISOS DE USUARIO
      const { cliente } = await validarUsuario(usuario, "Administrador");
      console.log(input.empresa);

      // VALIDAR SI NO EXISTE YA UN AREA CON EL MISMO NOMBRE
      const existeArea = await AreaTrabajoModelo.findOne({
        $and: [
          { nombre: input.nombre },
          { empresa: input.empresa },
          { cliente },
          { estatus: true },
        ],
      });

      if (existeArea)
        throw new Error(
          "Ya existe un area con el mismo nombre, intenta con otro."
        );

      // CREAMOS NUEVA AREA DE TRABAJO
      input.cliente = cliente;
      const areaTrabajoNueva = new AreaTrabajoModelo(input);
      const response = await areaTrabajoNueva.save();

      const responsePopulated = await AreaTrabajoModelo.populate(response, [{
        path: "empresa",
        model: EmpresaModelo,
      }, {
        path: 'centrosTrabajo',
        model: CentroTrabajoModelo
      }]);

      return responsePopulated;
    },
    actualizarAreaTrabajo: async (_, { id, input }, { usuario }) => {
      // TODO: VALIDAR USUARIO
      const { cliente } = await validarUsuario(usuario, "Administrador");

      // TODO: VALIDAR SI EL REGISTRO EXISTE
      const existeArea = await AreaTrabajoModelo.exists({
        $and: [{ _id: id }, { cliente }, { estatus: true }],
      });

      if (!existeArea) throw new Error("Area de Trabajo inexistente.");

      // VALIDAR SI EXISTE UN AREA CON EL MISMO NOMBRE
      const existeNombre = await AreaTrabajoModelo.findOne({
        $and: [
          { nombre: input.nombre },
          { _id: { $nin: [id] } },
          { empresa: input.empresa },
          { estatus: true },
          { cliente },
        ],
      });

      if (existeNombre)
        throw new Error(
          "Ya existe un area con el mismo nombre, intenta con otro."
        );

      const response = await AreaTrabajoModelo.findOneAndUpdate(
        { _id: id },
        input,
        { new: true }
      );

      // VALIDAR SI SE ACTUALIZÓ REGISTRO
      if (!response) throw new Error("No se pudo actualizar area de trabajo");

      const responsePopulated = await AreaTrabajoModelo.populate(response, [{
        path: "empresa",
        model: EmpresaModelo,
      }, {
        path: 'centrosTrabajo',
        model: CentroTrabajoModelo
      }]);

      // RETORNAR REGISTRO
      return responsePopulated;
    },
  },
};

module.exports = AreaTrabajoController;
