const EncuestasContestadasModelo = require("./../models/EncuestasContestadasModelo");
const EncuestaModelo = require("../models/EncuestaModelo");
const validarUsuario = require("../helpers/validarUsuario");
const UsuarioModelo = require("../models/UsuarioModelo");

const EncuestasContestadasController = {
  Mutation: {
    contestarEncuesta: async (_, { input, numeroEncuesta }, { usuario }) => {
      const { cliente, dataUsuario } = await validarUsuario(usuario, "Any");

      input.empleado = dataUsuario.id;
      input.numeroGuia = numeroEncuesta;

      const Encuesta = new EncuestasContestadasModelo(input);

      const EncuestaNueva = await Encuesta.save();

      if (!EncuestaNueva) throw new Error("No se ha podido registrar encuesta");

      // TODO: ELIMINAR ENCUESTA PENDIENTE DE USUARIO
      const removeItem = await UsuarioModelo.findByIdAndUpdate(dataUsuario.id, {
        $pull: { encuestasPendientes: parseInt(input.numeroGuia) },
      });

      return EncuestaNueva;
    },
  },
};

module.exports = EncuestasContestadasController;
