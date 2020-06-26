const auth = require("@auth0/nextjs-auth0");

const auth0 = auth.initAuth0({
    domain: "pro035.us.auth0.com",
    clientId: "sEM1bxf4kK4Lt6srassoci9UT8sEeeYq",
    clientSecret:
      "X3nEk2NO2lYUBLkgu2v1r_8uatuH-eqESKRP-Q04Qhptvk445mlH3ZaZdNIxjpaf",
    audience: "https://Pro035",
    scope: "openid profile",
    redirectUri: "http://localhost:3000/api/callback",
    postLogoutRedirectUri: "http://localhost:3000/",
    session: {
      // The secret used to encrypt the cookie.
      cookieSecret:
        "aE1OUWcLTmSLn8I79hNJPzjTo5-aE1OUWcLTmSLn8I79hNJPzjTo5-aE1OUWcLTmSLn8I79hNJPzjTo5",
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
      // (Optional) Configure the clock tolerance in milliseconds, if the time on your server is running behind.
      clockTolerance: 10000,
    },
  });
  
module.exports = auth0;
