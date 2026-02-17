import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./pages/UserDashboard";
import MechanicDashboard from "./pages/MechanicDashboard";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/mechanic" element={<MechanicDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
