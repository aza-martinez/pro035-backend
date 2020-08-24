require("dotenv").config({ path: "variables.env" });
const EmpresaModelo = require("../models/empresas");
const ClienteModelo = require("../models/clientes");
const validarUsuario = require("./../helpers/validarUsuario");

const EmpresaController = {
  Query: {
    obtenerEmpresas: async (_, { input }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const empresas = await EmpresaModelo.find({
        cliente: cliente.toString(),
      }).populate({
        path: "cliente",
        model: ClienteModelo,
      });

      if (!empresas) throw new Error("No se ha podido obtener las empresas");

      return empresas;
    },
  },
  Mutation: {
    agregarEmpresa: async (_, { input }, { usuario }) => {
      const { cliente } = await validarUsuario(usuario, "Administrador");

      const existeEmpresa = await EmpresaModelo.findOne({
        $and: [
          {
            $or: [{ razonSocial: input.razonSocial }, { alias: input.alias }],
          },
          {
            cliente: cliente,
          },
        ],
      });

      if (existeEmpresa)
        throw new Error("Empresa ya existe, favor intente con otros datos");

      input.cliente = cliente;
      const empresaNueva = new EmpresaModelo(input);
      const response = await empresaNueva.save();

      if (!response) throw new Error("No se ha podido guardar la empresa");

      return response;
    },
  },
};

module.exports = EmpresaController;