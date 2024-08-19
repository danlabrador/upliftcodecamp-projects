import { env } from "../env";
import mongoose from "mongoose";

let database: mongoose.Connection;

const connectToDatabase = async () => {
  if (env.NODE_ENV === "production") {
    await mongoose.connect(env.PROD_DATABASE_URL);
    database = mongoose.connection;
  } else {
    if (!(global as any).database) {
      await mongoose.connect(env.DEV_DATABASE_URL);
      (global as any).database = mongoose.connection;
    }
    database = (global as any).database;
  }
  console.log("Connected to database.");
  return database;
};

export { connectToDatabase };
