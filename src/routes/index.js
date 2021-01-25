const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");

module.exports = function ({ config }) {
  const router = express.Router();
  router
    .use(express.json())
    .use(cors(config.cors))
    .use(compression())
    .use(helmet());
  return router;
};
