"use strict";

require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const conectarDB = require("./helpers/mongo");
const { initAuth0 } = require("@auth0/nextjs-auth0");
const moment = require("moment-timezone");

conectarDB();

const auth0 = initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: "openid profile",
  audience: process.env.AUTH0_AUDIENCE,
  redirectUri: process.env.AUTH0_REDIRECT_URI,
  postLogoutRedirectUri: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret:
      "z3wdGc2QPktdqfKH5okjqUcanPNC8mgHdkdsKxLnkKq6CLNRPfpDRjeDdbobra9AF9arZNMPAvLB2Y7xxUUuQN8aKT93653UjYj9yCrjPrMHBR8c9vnQgixj8CanjCwn",
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
    cookieSameSite: "lax",
    // (Optional) Store the id_token in the session. Defaults to false.
    storeIdToken: true,
    // (Optional) Store the access_token in the session. Defaults to false.
    storeAccessToken: true,
    // (Optional) Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: true,
  },
  oidcClient: {
    // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 2500,
    // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000,
  },
});

// SERVIDOR
const server = new ApolloServer({
  cors: {
    origin: process.env.DOMAIN_CORS_ORIGIN || "http://localhost:3000",
    methods: "POST, GET, OPTIONS",
    optionsSuccessStatus: 200,
    credentials: true,
  },
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const usuario = await auth0.getSession(req);
    return {
      usuario: usuario,
    };
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`SERVIDOR LISTO EN LA URL: ${url}`);
  const date = moment().tz("America/Monterrey").toString();

  console.log(date);
});

module.exports = server;
