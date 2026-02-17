import SOS from "./models/SOS.js";

export const setupSocket = (io) => {

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("sos:create", async (data) => {
      try {
        const savedSOS = await SOS.create({
          location: data.location
        });

        io.emit("sos:incoming", savedSOS);

      } catch (err) {
        console.error("Error saving SOS:", err);
      }
    });

  });

};
