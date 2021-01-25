const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { NotFoundMiddleware, ErrorMiddleware } = require("./../middlewares");

let _express = null;
let _config = null;
let _schema = null;

class Server {
  constructor({ config, schema, router }) {
    _config = config;
    _express = express().use(router);
    _schema = schema;
  }

  start() {
    return new Promise((resolve, reject) => {
      const server = new ApolloServer({
        schema: _schema,
        context: ({ req }) => {
          const { authorization: token } = req.headers;
          console.log(token);
          return { token };
        },
      });

      server.applyMiddleware({ app: _express });

      _express.use(NotFoundMiddleware);
      _express.use(ErrorMiddleware);

      _express.listen(_config.PORT, () => {
        console.log(`RUNNING ON PORT: ${_config.PORT}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
