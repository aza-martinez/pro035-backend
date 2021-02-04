require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const UsuarioModelo = require("./../models/user.model");

const client = jwksClient({
  jwksUri: "https://pro035.us.auth0.com/.well-known/jwks.json",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (error, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

async function validateProfile(decodedToken, profile) {
  try {
    let userDB = null;
    const user_metadata = process.env.AUTH0_PAYLOAD_METADATA;
    const { perfil, user } = decodedToken[user_metadata];
    if (profile === "Any" || perfil === profile) {
      userDB = await UsuarioModelo.findOne({
        $or: [{ email: user }, { usuario: user }],
      });
    } else {
      throw new Error("No coincide perfil");
    }
    return userDB;
  } catch (error) {
    return error;
  }
}

async function validateToken(token, profile) {
  if (token) {
    try {
      const bearerToken = token.split(" ");

      const decodedToken = await verifyToken(bearerToken[1]);

      const user = await validateProfile(decodedToken, profile);

      return { decodedToken, user };
    } catch (error) {
      console.log("ERROR: ", error.message);
      return { error: error.message };
    }
  }

  return { error: "No token provided" };
}

module.exports = validateToken;
