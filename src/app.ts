import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { config } from "./config/index";
import { context } from "./helpers/context.helper";
import { authChecker } from "./helpers/authChecker.helper";
import compression from "compression";
import helmet from "helmet";

export async function startServer() {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
      dateScalarMode: "timestamp",
      emitSchemaFile: true,
      validate: false,
      authChecker: authChecker,
    }),
    playground: true,
    introspection: true,
    tracing: true,
    context,
  });

  app.use(helmet());
  app.use(express.json());
  app.use(cors(config.cors));
  app.use(compression());
  app.use(AuthMiddleware);

  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}
