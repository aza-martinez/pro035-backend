if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_USER_METADATA: process.env.JWT_USER_METADATA,
  cors: {
    /* origin: process.env.DOMAIN_CORS_ORIGIN || "http://localhost:3000", */
    origin: '*',
    optionsSuccessStatus: 200,
    methods: "POST,GET,OPTIONS",
    allowedHeaders: ["authorization", "Content-Type"],
  },
};
