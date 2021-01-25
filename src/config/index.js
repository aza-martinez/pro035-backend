if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  cors: {
    origin: process.env.DOMAIN_CORS_ORIGIN || "http://localhost:3000",
    optionsSuccessStatus: 200,
    methods: "POST,GET,OPTIONS",
    allowedHeaders: ["authorization", "Content-Type"],
  },
};
