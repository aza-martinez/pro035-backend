"use strict";

require("dotenv").config();
const UsuarioModelo = require("./../models/user.model");

const validarUsuario = async (usuario, perfil) => {
  if (!usuario) throw new Error("Credenciales no válidas");

  const user_metadata = usuario.user[process.env.AUTH0_PAYLOAD_METADATA];

  const existeUsuario = await UsuarioModelo.findOne({
    $or: [{ email: user_metadata.user }, { usuario: user_metadata.user }],
  });

  if (!existeUsuario) throw new Error("Error en las credenciales");

  if (perfil === "Any")
    return {
      cliente: user_metadata.cid,
      usuario: user_metadata.user,
      email: user_metadata.user,
      dataUsuario: existeUsuario,
    };

  if (existeUsuario.perfil !== perfil)
    throw new Error("Error en las credenciales");

  return {
    cliente: user_metadata.cid,
    usuario: user_metadata.user,
    email: user_metadata.user,
    dataUsuario: existeUsuario,
  };
};

module.exports = validarUsuario;
