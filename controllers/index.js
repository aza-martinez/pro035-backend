const UsuarioController = require("./UsuarioController");
const EmpresaController = require("./EmpresaController");
const CentrosTrabajoController = require("./CentrosTrabajoController");
const AreaTrabajoController = require("./AreasTrabajoController");
const PuestosController = require("./PuestosController");
const PeriodoEvaluacionController = require("./PeriodosEvaluacionController");
const EncuestaController = require("./EncuestaController");
const PreguntaController = require('../controllers/PreguntasController');
const EncuestasContestadasController = require('./../controllers/EncuestasContestadasController');

module.exports = {
  Query: {
    ...UsuarioController.Query,
    ...EmpresaController.Query,
    ...CentrosTrabajoController.Query,
    ...AreaTrabajoController.Query,
    ...PuestosController.Query,
    ...PeriodoEvaluacionController.Query,
    ...EncuestaController.Query,
    ...PreguntaController.Query,
    ...EncuestasContestadasController.Query
  },
  Mutation: {
    ...UsuarioController.Mutation,
    ...EmpresaController.Mutation,
    ...CentrosTrabajoController.Mutation,
    ...AreaTrabajoController.Mutation,
    ...PuestosController.Mutation,
    ...PeriodoEvaluacionController.Mutation,
    ...EncuestaController.Mutation,
    ...EncuestasContestadasController.Mutation
  },
};
