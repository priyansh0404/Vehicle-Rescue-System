import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

function App() {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // initialize only once
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("sos-alert", (data) => {
      setMessages((prev) => [...prev, data.msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendSOS = () => {
    socketRef.current.emit("sos", {
      location: { lat: 29.9457, lng: 78.1642 },
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>SOS Mini Project</h1>

      <button onClick={sendSOS}>🚨 Send SOS</button>

      <h2>Alerts:</h2>
      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
  );
}

export default App;
