import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Streamify from "./pages/Streamify";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Streamify />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
};
export default App
