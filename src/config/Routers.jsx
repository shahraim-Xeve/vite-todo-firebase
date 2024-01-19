import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Error from "../components/Error";
import Todo from "../screens/Todo";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ProtectRoute from "./ProtectRoute";

export default function Routers() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectRoute todo={<Todo />} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
