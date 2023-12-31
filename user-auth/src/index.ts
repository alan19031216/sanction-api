import mongoose from "mongoose";
import 'dotenv/config'

import { app } from "./app";

require('dotenv').config()

const start = async () => {
  console.log("Auth ....")
//   if (!process.env.JWT_KEY) {
//     throw new Error("JWT_KEY must be define");
//   }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be define");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("User Auth Connected MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
  });
};

start();
