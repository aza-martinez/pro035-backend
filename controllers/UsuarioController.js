require('dotenv').config({ path: 'variables.env' });
const UsuarioModelo = require('../models/UsuarioModelo');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crearToken = (usuario) => {
	const privateKey = process.env.JWT_SECRET;
	const { id, email, nombre, apellidoPaterno, apellidoMaterno, cliente, perfil } = usuario;

	return jwt.sign({ sub: id, email, nombre, apellidoPaterno, apellidoMaterno, cid: cliente }, privateKey, {
		expiresIn: 60 * 60 * 24
	});
};

const UsuarioController = {
	Query: {},
	Mutation: {
		nuevoUsuario: async (_, { input }, ctx) => {
			try {
				const { usuario, email, password } = input;

				//verificando si existe usuario
				const usuarioExiste = await UsuarioModelo.findOne({
					$or: [ { email }, { usuario } ]
				});

				if (usuarioExiste) throw new Error('El usuario ya está registrado');

				// Hasheamos password
				const salt = await bcryptjs.genSalt(10);
				input.password = await bcryptjs.hash(password, salt);

				// Instanciamos nuevo usuario y lo guardamos
				const nuevoUsuario = new UsuarioModelo(input);
				const response = nuevoUsuario.save();

				if (!response) throw new Error('No se pudo registrar el usuario');

				return response;
			} catch (error) {
				console.log('Ocurrió un error al registrar usuario');
				console.log(error);
				return error;
			}
		},
		autenticarUsuario: async (_, { input }, ctx) => {
			// validar si el usuario existe
			const { email, password } = input;

			const existeUsuario = await UsuarioModelo.findOne({ email });

			if (!existeUsuario) throw new Error('Error en las credenciales');

			// Revisar si el password es correcto
			const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);

			if (!passwordCorrecto) throw new Error('Error en las credenciales');

			// CREAR EL TOKEN
			return {
				token: crearToken(existeUsuario)
			};
		}
	}
};

module.exports = UsuarioController;
