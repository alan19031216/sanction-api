import mongoose from "mongoose";
import 'dotenv/config'

import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { AdminCreatedListener } from "./events/listener/admin-created-listeners";

require('dotenv').config()

const start = async () => {
  console.log("Sanction Database ....")
  //   if (!process.env.JWT_KEY) {
  //     throw new Error("JWT_KEY must be define");
  //   }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be define");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be define");
  }

  if (!process.env.NAST_CLIENT_ID) {
    throw new Error("NAST_CLIENT_ID must be define");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be define");
  }

  try {
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NAST_CLIENT_ID, process.env.NATS_URL)
    natsWrapper.client.on("close", () => {
      console.log("NATS, connection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new AdminCreatedListener(natsWrapper.client).listen()

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Sanction Database Connected MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
  });
};

start();
