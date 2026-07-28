import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Streamify from "./pages/Streamify";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Player from "./pages/Player";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

function App() {
  return (
    <BrowserRouter>
     <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Streamify />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="player" element={<Player/>}/>
      </Routes>
    </BrowserRouter>

  );
};
export default App
