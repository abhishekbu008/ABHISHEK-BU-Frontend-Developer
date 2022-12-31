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

  app.listen(3001, () => {
    console.log("Listening on port 3000");
  });
};

start();
