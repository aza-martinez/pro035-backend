const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
