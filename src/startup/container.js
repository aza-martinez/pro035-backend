const awilix = require("awilix");
const { createContainer, asClass, asValue, asFunction } = awilix;
const config = require("../config");
const app = require(".");

// SCHEMA
const schema = require("./../graphql");

// SERVICES

//ROUTES
const Routes = require("./../routes");

// MODELS
const { Job, User } = require("./../models");

// REPOSITORIES

const container = createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container
  .register({
    app: asClass(app).singleton(),
    config: asValue(config),
    schema: asValue(schema),
  })
  .register({
    router: asFunction(Routes).singleton(),
  })
  .register({
    Job: asValue(Job),
    User: asValue(User),
  });

module.exports = container;
