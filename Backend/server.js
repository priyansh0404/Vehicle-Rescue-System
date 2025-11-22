import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("sos", (data) => {
    console.log("SOS received:", data);

    // Broadcast SOS alert to all connected clients
    io.emit("sos-alert", {
      msg: "New SOS Request!",
      location: data.location
    });
  });
});

app.get("/", (req, res) => {
  res.send("SOS Mini Backend Running (ESM)");
});

server.listen(5000, () => console.log("Server running on PORT 5000"));
