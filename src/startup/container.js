const { createContainer, asClass, asValue, asFunction } = require("awilix");
const config = require("../config");
const app = require(".");

// SCHEMA
const schema = require("./../graphql");

// SERVICES

//ROUTES
const Routes = require("./../routes");

// MODELS

// REPOSITORIES

const container = createContainer();

container
  .register({
    app: asClass(app).singleton(),
    config: asValue(config),
    schema: asValue(schema),
  })
  .register({
    router: asFunction(Routes).singleton(),
  });

module.exports = container;
