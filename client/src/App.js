import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/profile/:userId" element={<Profile />}></Route>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}></Route>
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}></Route>
      </Routes>
    </Router>
  );
}
