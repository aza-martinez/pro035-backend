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
    logo: String
    giro: String
    principalesActividades: String
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
    genero: String
    rangoEdad: String
    estadoCivil: String
    nivelEstudios: String
    tipoPuesto: String
    tipoContratacion: String
    tipoPersonal: String
    tipoJornada: String
    rolarTurnos: String
    experienciaPuestoActual: String
    tiempoExperienciaLaboral: String
    email: String
    perfil: String
    usuario: String
    firstLogin: Boolean
    cliente: ID
    encuestasPendientes: [Int]
    puesto: Puesto
    centroTrabajo: CentroTrabajo
    empresa: Empresa
    areaTrabajo: AreaTrabajo
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
    encuesta: Encuesta
    estatus: String
    empleados: [EmpleadosPeriodoEvaluacion]
    creado: String
    fechaPendiente: String
    fechaEnProceso: String
    fechaFinalizado: String
    empresa: Empresa
    encuestas: [Int]
    categorias: [Categoria]
    dominios: [Dominio]
    encuestasContestadas: [EncuestaContestada]
  }

  type EmpleadosPeriodoEvaluacion {
    id: ID
    empleado: Usuario
    encuestas: [EncuestasEmpleadoPE]
  }

  type EncuestasEmpleadoPE {
    estatus: String
    numeroGuia: String
    descripcion: String
  }

  type Encuesta {
    numeroEncuesta: String
    descripcion: String
    totalPreguntas: Int
    categorias: [Categoria]
    nivelesRiesgo: [NivelRiesgo]
  }

  type Categoria {
    id: ID
    numeroGuia: Int
    descripcion: String
    dominios: [Dominio]
    preguntas: [ID]
    enumeracion: Int
    nivelesRiesgo: [NivelRiesgo]
  }

  type NivelRiesgo {
    nivel: String
    minimo: Int
    maximo: Int
  }

  type Dominio {
    id: ID
    numeroGuia: Int
    descripcion: String
    nivelesRiesgo: [NivelRiesgo]
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
    plural: String
    orden: String
  }

  type EncuestaContestada {
    id: ID
    periodoEvaluacion: PeriodoEvaluacion
    ats: Boolean
    requireAnalisis: Boolean
    empleado: Usuario
    numeroGuia: String
    createdAt: String
    respuestas: [RespuestaEncuestaContestada]
  }

  type RespuestaEncuestaContestada {
    id: ID
    categoria: Categoria
    dominio: Dominio
    dimension: Dimension
    enumeracion: Float
    pregunta: Pregunta
    valorRespuesta: Int
    descripcionRespuesta: String
    respuesta: ID
  }

  input UsuarioInput {
    nombre: String!
    apellidoPaterno: String!
    apellidoMaterno: String!
    genero: String
    rangoEdad: String
    estadoCivil: String
    nivelEstudios: String
    tipoPuesto: String
    tipoContratacion: String
    tipoPersonal: String
    tipoJornada: String
    rolarTurnos: String
    experienciaPuestoActual: String
    tiempoExperienciaLaboral: String
    email: String
    perfil: String
    usuario: String
    password: String
    cliente: ID
    empresa: ID
    centroTrabajo: ID
    puesto: ID
    areaTrabajo: ID
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
    giro: String
    principalesActividades: String
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
    empleados: [EmpleadosPeriodoEvaluacionInput]!
    empresa: ID!
    encuestas: [Int]
  }

  input EmpleadosPeriodoEvaluacionInput {
    empleado: ID
    encuestas: [EncuestasEmpleadoPEInput]
  }

  input EncuestasEmpleadoPEInput {
    estatus: String
    numeroGuia: String
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
    enumeracion: Float
    pregunta: ID
    valorRespuesta: Int
    descripcionRespuesta: String
    respuesta: ID
  }

  input ReporteInput {
    encuesta: String
    periodoEvaluacion: ID
    empleado: ID
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
    obtenerAreasTrabajoCentroTrabajo(centroTrabajo: ID!): [AreaTrabajo]
    obtenerPuestos(empresa: ID!): [Puesto]
    obtenerPuesto(id: ID!, empresa: ID!): Puesto
    obtenerPeriodosEvaluacion(
      empresa: ID
      centroTrabajo: ID
    ): [PeriodoEvaluacion]
    obtenerPeriodoEvaluacion(id: ID): PeriodoEvaluacion
    obtenerEncuestasPendientesUsuario: [EncuestasEmpleadoPE]
    obtenerEncuestaPorNumeracion(numeroEncuesta: String!): Encuesta
    obtenerPreguntasPorEncuesta(numeroEncuesta: String!): [Pregunta]
    obtenerPeriodoEvaluacionPorUsuario: PeriodoEvaluacion
    obtenerEncuestasContestadaPE(
      periodoEvaluacion: ID
      numeroGuia: String
    ): [EncuestaContestada]
    obtenerEncuestaContestadaEmpleado(input: ReporteInput): EncuestaContestada
    reporteCentroTrabajo(
      periodoEvaluacion: ID!
      numeroGuia: String!
    ): PeriodoEvaluacion
  }

  type Mutation {
    nuevoUsuario(input: UsuarioInput): Usuario
    actualizarUsuario(id: ID!, input: UsuarioInput): Usuario
    agregarEmpresa(input: EmpresaInput, logo: Upload): Empresa
    agregarCentroTrabajo(input: CentroTrabajoInput): CentroTrabajo
    actualizarCentroTrabajo(id: ID!, input: CentroTrabajoInput): CentroTrabajo
    agregarAreaTrabajo(input: AreaTrabajoInput): AreaTrabajo
    actualizarAreaTrabajo(id: ID!, input: AreaTrabajoInput): AreaTrabajo
    agregarPuesto(input: PuestoInput): Puesto
    actualizarPuesto(id: ID!, input: PuestoInput): Puesto
    registrarPeriodoEvaluacion(input: PeriodoEvaluacionInput): PeriodoEvaluacion
    contestarEncuesta(
      input: EncuestaContestadaInput
      numeroEncuesta: String
    ): EncuestaContestada
    generarReportePorEmpleado(input: ReporteInput): EncuestaContestada
  }
`;

module.exports = typeDefs;
