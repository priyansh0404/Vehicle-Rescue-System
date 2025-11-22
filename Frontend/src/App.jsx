import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAlert = (data) => {
      setMessages((prev) => [...prev, data.msg]);
    };

    socket.on("sos-alert", handleAlert);

    return () => {
      socket.off("sos-alert", handleAlert); 
    };
  }, []);

  const sendSOS = () => {
    socket.emit("sos", {
      location: { lat: 29.9457, lng: 78.1642 },
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>SOS Mini Project</h1>

      <button onClick={sendSOS}>
         Send SOS
      </button>

      <h2>Alerts:</h2>
      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
  );
}

export default App;
