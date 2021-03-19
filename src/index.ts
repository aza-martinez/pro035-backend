import "reflect-metadata";
import { startServer } from "./app";
import mongoose from "mongoose";
import { config } from "./config";

const URI: string = config.MONGO_URI as string;

async function main() {
  try {
    mongoose.set("useCreateIndex", true);

    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    const app = await startServer();
    app.listen(config.PORT);
    console.log("Server on port", config.PORT);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

main();
