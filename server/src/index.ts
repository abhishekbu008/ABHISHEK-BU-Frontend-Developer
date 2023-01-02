import { getMongoUri } from "./config";
import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log("Starting up...");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect(await getMongoUri());
  } catch (err) {
    console.log(err);
  }

  if (!process.env.PORT) {
    process.env.PORT = "3001";
  }

  app.listen(+process.env.PORT, () => {
    console.log("Listening on port " + process.env.PORT);
  });
};

start();
