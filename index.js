"use strict";

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const conectarDB = require("./helpers/mongo");
const { initAuth0 } = require("@auth0/nextjs-auth0");

conectarDB();

const auth0 = initAuth0({
  domain: "pro035.us.auth0.com",
  clientId: "sEM1bxf4kK4Lt6srassoci9UT8sEeeYq",
  clientSecret:
    "X3nEk2NO2lYUBLkgu2v1r_8uatuH-eqESKRP-Q04Qhptvk445mlH3ZaZdNIxjpaf",
  scope: "openid profile",
  audience: "https://Pro035",
  redirectUri: "https://pro035.itcomsoft.vercel.app/api/callback",
  postLogoutRedirectUri: "https://pro035.itcomsoft.vercel.app/",
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
    origin: "https://pro035.itcomsoft.vercel.app",
    methods: "POST, GET, OPTIONS",
    optionsSuccessStatus: 204,
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
});

module.exports = server;
