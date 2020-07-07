require('dotenv').config({ path: 'variables.env' });
const EmpresaModelo = require('../models/empresas');

const EmpresaController = {
    Query: {
        obtenerEmpresas: async (_, { input }, ctx) => {
            const empresas = EmpresaModelo.find({});

            return empresas;
        }
    }
}

module.exports = EmpresaController