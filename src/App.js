import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";

import Admin from "./pages/Admin"
import Login from "./pages/Login";

const App = () => (
  <Routes>
    <Route exact path="/" element={<Login/>} />
    <Route path="/homeAdmin" element={<Admin/>} />

  </Routes>
);
export default App;
