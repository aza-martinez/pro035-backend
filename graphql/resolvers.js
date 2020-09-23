const Controllers = require("./../controllers");
const { GraphQLUpload } = require("graphql-upload");

const resolvers = {
  ...Controllers,
};

module.exports = resolvers;
