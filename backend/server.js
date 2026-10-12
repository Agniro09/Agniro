import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/connectdb.js";

const startServer = async () => {
  const server = app.listen(config.port, () => {
    console.log(`API server listening on port ${config.port}.`);
  });

  connectDB().catch((error) => {
    console.error("MongoDB connection failed; starting API without persistence:", error.message);
  });

  const shutdown = (signal) => {
    console.log(`${signal} received; shutting down.`);
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  };

  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
};

startServer().catch((error) => {
  console.error("Unable to start the API server:", error.message);
  process.exitCode = 1;
});

