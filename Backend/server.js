import express from "express"; // Import Express to create HTTP routes and middleware
import http from "http"; // Import Node's HTTP module to create a server instance
import { Server } from "socket.io"; // Import Socket.IO Server class for real-time sockets
import cors from "cors"; // Import CORS middleware to allow cross-origin requests

const app = express(); // Create an Express application instance
app.use(cors()); // Enable CORS on all routes with default settings
app.use(express.json()); // Parse incoming JSON request bodies into req.body

const server = http.createServer(app); // Create a Node HTTP server using the Express app

const io = new Server(server, { 
  // Attach a new Socket.IO server to the HTTP server
  cors: { origin: "*" }, // Allow socket connections from any origin (very permissive)
}); // End Socket.IO server setup

io.on("connection", (socket) => {
  // Listen for new socket connections
  console.log("Connected:", socket.id); // Log the connected client's socket id

  socket.on("sos", (data) => {
    // Listen for "sos" events sent by a connected client
    console.log("SOS received:", data); // Log the SOS payload for debugging

    // Broadcast SOS alert to all connected clients
    io.emit("sos-alert", {
      // Emit a "sos-alert" event to every connected client
      msg: "New SOS Request!", // Include a message in the payload
      location: data.location, // Forward the provided location from the SOS payload
    }); // End emit payload
  }); // End "sos" event handler
}); // End "connection" handler

app.get("/", (req, res) => {
  // Define a GET route for the root path to verify server is running
  res.send("SOS Mini Backend Running (ESM)"); // Respond with a short status string
}); // End route

server.listen(5000, () => console.log("Server running on PORT 5000")); // Start listening on port 5000 and log when ready
