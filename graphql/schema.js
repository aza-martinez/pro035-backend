const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Empresa {
		id: ID
		razonSocial: String,
		alias: String
		calle: String
		colonia: String
		cp: String
		rfc: String
	}

	type EncuestasPendientes {
		id: ID,
		numeroEncuesta: Int
	}

	type Usuario {
		nombre: String,
		apellidoPaterno: String,
		apellidoMaterno: String,
		sexo: String,
		edad: Int,
		estadoCivil: String,
		nivelEstudios: String,
		tipoPuesto: String,
		tipoContratacion: String,
		tipoPersonal: String,
		tipoJornada: String,
		rolarTurnos: String,
		experienciaPuestoAcutal: String,
		tiempoExperienciaLaboral: String,
		email: String,
		perfil: String,
		usuario: String,
		firstLogin: Boolean,
		cliente: String,
	}

	type Token {
		token: String
	}

	input UsuarioInput {
		nombre: String!,
		apellidoPaterno: String!,
		apellidoMaterno: String!,
		sexo: String,
		edad: Int,
		estadoCivil: String,
		nivelEstudios: String,
		tipoPuesto: String,
		tipoContratacion: String,
		tipoPersonal: String,
		tipoJornada: String,
		rolarTurnos: String,
		experienciaPuestoAcutal: String,
		tiempoExperienciaLaboral: String,
		email: String,
		perfil: String!,
		usuario: String!,
		password: String!,
		cliente: ID,
	}

	input AutenticarInput {
		email: String,
		usuario: String,
		password: String
	}

	type Query {
		obtenerUsuario(token: String!) : Usuario,
		obtenerEmpresas : [Empresa]
	}

	type Mutation {
		nuevoUsuario(input: UsuarioInput) : Usuario
		autenticarUsuario(input: AutenticarInput) : Token
	}
`;

module.exports = typeDefs;
