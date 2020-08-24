const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Cliente {
    id: ID
    razonSocial: String
    alias: String
    direccion: String
    cp: String
    rfc: String
  }

  type Empresa {
    id: ID
    razonSocial: String
    alias: String
    direccion: String
    cp: String
    rfc: String
    cliente: Cliente
  }

  type CentroTrabajo {
    id: ID
    nombre: String
    direccion: String
    cp: String
    telefono: String
    estatus: Boolean
    empresa: ID
  }

  type Puesto {
    id: ID
    nombre: String
    descripcion: String
  }

  type Usuario {
    id: ID
    nombre: String
    apellidoPaterno: String
    apellidoMaterno: String
    sexo: String
    edad: Int
    estadoCivil: String
    nivelEstudios: String
    tipoPuesto: String
    tipoContratacion: String
    tipoPersonal: String
    tipoJornada: String
    rolarTurnos: String
    experienciaPuestoAcutal: String
    tiempoExperienciaLaboral: String
    email: String
    perfil: String
    usuario: String
    firstLogin: Boolean
    cliente: ID
    encuestasPendientes: [Int]
    puesto: Puesto
    centroTrabajo: ID
    empresa: ID
  }

  type Token {
    token: String
  }

  type AreaTrabajo {
    id: ID
    nombre: String
    descripcion: String
    estatus: Boolean
    empresa: Empresa
    centrosTrabajo: [CentroTrabajo]
  }

  type PeriodoEvaluacion {
    id: ID
    nombre: String
    rangoEmpleados: String
    centroTrabajo: CentroTrabajo
    estatus: String
    empleados: [Usuario]
    creado: String
    fechaPendiente: String
    fechaEnProceso: String
    fechaFinalizado: String
    empresa: ID
    encuestas: [Int]
  }

  type Encuesta {
    numeroEncuesta: String
    descripcion: String
    totalPreguntas: Int
    categorias: [Categoria]
  }

  type Categoria {
    id: ID
    numeroGuia: Int
    descripcion: String
    dominios: [Dominio]
    preguntas: [ID]
    enumeracion: Int
  }

  type Dominio {
    id: ID
    numeroGuia: Int
    descripcion: String
    dimensiones: [Dimension]
  }

  type Dimension {
    id: ID
    numeroGuia: Int
    descripcion: String
    preguntas: [Pregunta]
  }

  type Pregunta {
    id: ID
    numeroGuia: String
    descripcion: String
    enumeracion: Float
    respuestas: [Respuesta]
    categoria: Categoria
    dominio: Dominio
    dimension: Dimension
    mensaje: Mensaje
    dependencias: [Int]
    field: String
  }

  type Respuesta {
    id: ID
    descripcion: String
    valor: Int
  }

  type Mensaje {
    id: ID
    mensaje: String
  }

  type EncuestaContestada {
    id: ID   
    periodoEvaluacion: ID
    ats: Boolean
    respuestas: [RespuestaEncuestaContestada]
  }

  type RespuestaEncuestaContestada {
    categoria: ID
    dominio: ID
    dimension: ID
    enumeracion: Int
    pregunta: ID
    valorRespuesta: Int
    descripcionRespuesta: String
    respuesta: ID
  }

  input UsuarioInput {
    nombre: String!
    apellidoPaterno: String!
    apellidoMaterno: String!
    sexo: String
    edad: Int
    estadoCivil: String
    nivelEstudios: String
    tipoPuesto: String
    tipoContratacion: String
    tipoPersonal: String
    tipoJornada: String
    rolarTurnos: String
    experienciaPuestoAcutal: String
    tiempoExperienciaLaboral: String
    email: String
    perfil: String!
    usuario: String!
    password: String
    cliente: ID
    empresa: ID
    centroTrabajo: ID!
  }

  input AutenticarInput {
    email: String
    usuario: String
    password: String
  }

  input EmpresaInput {
    razonSocial: String!
    alias: String!
    direccion: String!
    cp: String
    rfc: String!
  }

  input CentroTrabajoInput {
    nombre: String!
    direccion: String!
    cp: String!
    telefono: String
    empresa: ID!
  }

  input AreaTrabajoInput {
    nombre: String!
    descripcion: String
    centrosTrabajo: [ID]
    empresa: ID!
  }

  input PuestoInput {
    nombre: String!
    descripcion: String
    empresa: ID!
  }

  input PeriodoEvaluacionInput {
    nombre: String!
    rangoEmpleados: String!
    centroTrabajo: ID!
    empleados: [ID]!
    empresa: ID!
    encuestas: [Int]
  }

  input EncuestaContestadaInput {
    periodoEvaluacion: ID!
    ats: Boolean
    respuestas: [RespuestaEncuestaContestadaInput]
    requireAnalisis: Boolean
  }

  input RespuestaEncuestaContestadaInput {
    categoria: ID
    dominio: ID
    dimension: ID
    enumeracion: Int
    pregunta: ID
    valorRespuesta: Int
    descripcionRespuesta: String
    respuesta: ID
  }
  
  type Query {
    obtenerUsuarioPorId(id: ID!, empresa: ID!): Usuario
    obtenerUsuarioAutenticado: Usuario
    obtenerUsuarios(empresa: ID): [Usuario]
    obtenerUsuariosPorCentroTrabajo(centroTrabajo: ID!, empresa: ID!): [Usuario]
    obtenerEmpresas: [Empresa]
    obtenerCentrosTrabajo(empresa: ID!): [CentroTrabajo]
    obtenerAreasTrabajo(empresa: ID!): [AreaTrabajo]
    obtenerAreaTrabajo(id: ID!, empresa: ID!): AreaTrabajo
    obtenerPuestos(empresa: ID!): [Puesto]
    obtenerPuesto(id: ID!, empresa: ID!): Puesto
    obtenerPeriodosEvaluacion(empresa: ID!): [PeriodoEvaluacion]
    obtenerEncuestaPorNumeracion(numeroEncuesta: String!): Encuesta
    obtenerPreguntasPorEncuesta(numeroEncuesta: String!): [Pregunta]
    obtenerPeriodoEvaluacionPorUsuario: PeriodoEvaluacion
  }

  type Mutation {
    nuevoUsuario(input: UsuarioInput): Usuario
    actualizarUsuario(id: ID!, input: UsuarioInput): Usuario
    agregarEmpresa(input: EmpresaInput): Empresa
    agregarCentroTrabajo(input: CentroTrabajoInput): CentroTrabajo
    actualizarCentroTrabajo(id: ID!, input: CentroTrabajoInput): CentroTrabajo
    agregarAreaTrabajo(input: AreaTrabajoInput): AreaTrabajo
    actualizarAreaTrabajo(id: ID!, input: AreaTrabajoInput): AreaTrabajo
    agregarPuesto(input: PuestoInput): Puesto
    actualizarPuesto(id: ID!, input: PuestoInput): Puesto
    registrarPeriodoEvaluacion(input: PeriodoEvaluacionInput): PeriodoEvaluacion
    contestarEncuesta(input: EncuestaContestadaInput, numeroEncuesta: String) : EncuestaContestada
  }
`;

module.exports = typeDefs;
