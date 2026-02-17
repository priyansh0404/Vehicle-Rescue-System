import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

import { MONGO_URL } from "./config.js";
import sosRoutes from "./routes/sosRoutes.js";
import { setupSocket } from "./socket.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// REST routes
app.use("/api/sos", sosRoutes);

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.IO
const io = new Server(server, {
  cors: { origin: "*" }
});

setupSocket(io);

server.listen(5000, () => {
  console.log("Server running on PORT 5000");
});
