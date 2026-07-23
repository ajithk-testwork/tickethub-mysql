import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
function App() {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* User */}

      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
