import { useEffect, useState } from "react";
import { socket } from "../socket";
import { fetchSOS } from "../api";
import SOSButton from "../components/SOSButton";
import SOSList from "../components/SOSList";

function UserDashboard() {
  const [sosList, setSosList] = useState([]);

  useEffect(() => {
    // Fetch history on load
    fetchSOS().then(data => setSosList(data));

    // Listen for new SOS
    socket.on("sos:incoming", (newSOS) => {
      setSosList(prev => [newSOS, ...prev]);
    });

    return () => socket.off("sos:incoming");
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <SOSButton />
      <SOSList sosList={sosList} />
    </div>
  );
}

export default UserDashboard;
