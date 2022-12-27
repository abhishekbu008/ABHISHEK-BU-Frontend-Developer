import * as dotenv from "dotenv";
dotenv.config();
import { MongoMemoryServer } from "mongodb-memory-server";

const getMongoUri = async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  return uri;
};

export { getMongoUri };
