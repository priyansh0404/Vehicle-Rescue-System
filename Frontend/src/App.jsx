import { useEffect, useState } from "react"; // Import React hooks: useEffect for side effects and useState for component state
import { io } from "socket.io-client"; // Import Socket.IO client to connect to a Socket.IO server

const socket = io("http://localhost:5000"); // Create a socket connection to the backend at localhost:5000

function App() {
  // Define the main React component
  const [messages, setMessages] = useState([]); // Local state to store alert messages (array)

  useEffect(() => {
    // Run once after mount to set up socket listeners
    const handleAlert = (data) => {
      // Handler for incoming "sos-alert" events
      setMessages((prev) => [...prev, data.msg]); // Append the incoming message text to messages state
    };

    socket.on("sos-alert", handleAlert); // Register the alert handler on the socket

    return () => {
      // Cleanup function when component unmounts
      socket.off("sos-alert", handleAlert); // Remove the handler to avoid memory leaks
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const sendSOS = () => {
    // Function to send a test SOS event to the server
    socket.emit("sos", {
      // Emit the "sos" event with a payload
      location: { lat: 29.9457, lng: 78.1642 }, // Example location included in the payload
    });
  };

  return (
    // Render the component UI
    <div style={{ padding: 30 }}>
      {" "}
      {/* Container with inline padding style */}
      <h1>SOS Mini Project</h1> {/* Title/header for the app */}
      <button onClick={sendSOS}>
        {" "}
        {/* Button that triggers sendSOS on click */}
        Send SOS {/* Button label shown to the user */}
      </button>
      <h2>Alerts:</h2> {/* Subheading for incoming alerts */}
      {messages.map((m, i) => {
        // Render a paragraph for each message in state
        // Individual alert message; key uses the index (ok for simple lists)
        return <p key={i}>{m}</p>;
      })}
    </div>
  );
}

export default App; // Export the component as the default export
