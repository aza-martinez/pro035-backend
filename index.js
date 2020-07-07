'use strict';
//Variables a utilizar.
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const conectarDB = require('./helpers/mongo');

conectarDB();

// SERVIDOR
const server = new ApolloServer({
    cors: {
        origin: "http://localhost:3000",
        methods: "POST",
        optionsSuccessStatus: 204,
        credentials: true
    },
    typeDefs,
    resolvers,
});


server.listen().then(({ url }) => {
	console.log(`SERVIDOR LISTO EN LA URL: ${url}`);
});

module.exports = server;
