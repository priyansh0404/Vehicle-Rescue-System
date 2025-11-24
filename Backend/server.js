import express from "express"; // Import Express to create HTTP routes and middleware
import http from "http"; // Import Node's HTTP module to create a server instance
import { Server } from "socket.io"; // Import Socket.IO Server class for real-time sockets
import cors from "cors"; // Import CORS middleware to allow cross-origin requests

const app = express(); // Create an Express application instance

app.use(cors()); // Enable CORS on all routes with default settings
app.use(express.json()); // Parse incoming JSON request bodies into req.body
import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected ✔"))
  .catch((err) => console.log("MongoDB Error:", err));

// ----------------------
// 2️⃣ SOS Schema + Model
// ----------------------


const sosSchema = new mongoose.Schema({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  createdAt: {
    type: Date, 
    default: Date.now,
  },
});

// This creates a "SOS" collection in MongoDB
export const SOS = mongoose.model("SOS", sosSchema); 

const server = http.createServer(app); // Create a Node HTTP server using the Express app

const io = new Server(server, {
  // Attach a new Socket.IO server to the HTTP server
  cors: { origin: "*" }, // Allow socket connections from any origin (very permissive)
}); // End Socket.IO server setup

io.on("connection", (socket) => {
  // Listen for new socket connections
  console.log("Connected:", socket.id); // Log the connected client's socket id

  socket.on("sos", async (data) => {
    console.log("SOS received:", data);

    try {
      // Save SOS to database
      const savedSOS = await SOS.create({
        location: {
          lat: data.location.lat,
          lng: data.location.lng,
        },
      });

      console.log("Saved SOS:", savedSOS);

      // Broadcast alert to all connected clients
      io.emit("sos-alert", {
        msg: "🚨 New SOS Request!",
        location: data.location,
        id: savedSOS._id, // send MongoDB ID back to frontend
      });
    } catch (err) {
      console.error("Error saving SOS:", err);
    }
  });
}); // End "connection" handler

app.get("/", (req, res) => {
  // Define a GET route for the root path to verify server is running
  res.send("SOS Mini Backend Running (ESM)"); // Respond with a short status string
}); // End route

server.listen(5000, () => console.log("Server running on PORT 5000")); // Start listening on port 5000 and log when ready
