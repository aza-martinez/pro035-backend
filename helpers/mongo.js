"use strict";

const mongoose = require("mongoose");
require('dotenv').config({ path: 'variables.env' });
process.setMaxListeners(0);

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('DB conectada');
  } catch (error) {
    console.log('Error Interno');
    console.log(error);
    process.exit(1);
  }
}

module.exports = conectarDB;
