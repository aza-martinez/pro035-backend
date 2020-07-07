const UsuarioController = require('./UsuarioController');
const EmpresaController = require('./EmpresaController');

module.exports = {
    Query: {
        ...EmpresaController.Query
    },
    Mutation: {
        ...UsuarioController.Mutation
    }
}