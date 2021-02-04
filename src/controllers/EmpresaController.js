const cloudinary = require("./../helpers/cloudinary");
const EmpresaModelo = require("../models/empresas");
const ClienteModelo = require("../models/clientes");
const validarUsuario = require("./../helpers/validarUsuario");
const validateToken = require("./../helpers/auth0");

module.exports.EmpresaController = function () {
  return {
    Query: {
      obtenerEmpresas: async (_, __, { token }) => {
        const { user } = await validateToken(token, "Any");
        console.log(user);
        const empresas = await EmpresaModelo.find({
          cliente: user.cliente.toString(),
        }).populate({
          path: "cliente",
          model: ClienteModelo,
        });

        if (!empresas) throw new Error("No se ha podido obtener las empresas");

        return empresas;
      },
    },
    Mutation: {
      agregarEmpresa: async (_, { input, logo }, { usuario }) => {
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

        const { createReadStream } = await logo[0];

        const result = await new Promise((resolve, reject) => {
          createReadStream().pipe(
            cloudinary.uploader.upload_stream(
              {
                folder: "/pro035/logos-empresas/",
              },
              (error, result) => {
                if (error) reject(error);

                resolve(result);
              }
            )
          );
        });

        console.log(result);

        input.logo = result.secure_url;
        input.cliente = cliente;
        const empresaNueva = new EmpresaModelo(input);
        const response = await empresaNueva.save();

        if (!response) throw new Error("No se ha podido guardar la empresa");

        return response;
      },
    },
  };
};
