import { socket } from "../socket";

function SOSButton() {

  const sendSOS = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      socket.emit("sos:create", {
        location: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      });
    });
  };

  return (
    <button onClick={sendSOS}>
      🚨 Send SOS
    </button>
  );
}

export default SOSButton;
