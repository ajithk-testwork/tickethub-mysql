import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
function App() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/event/:id" element={<EventDetails />} />

      {/* User */}

      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
