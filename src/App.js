import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";

import Login from "./Commponents/Login";
import Dashboard from "./pages/Admin/Dashboard";
import User from "./pages/Admin/User";
import Meja from "./pages/Admin/Meja";
import Menu from "./pages/Admin/Menu";

import Transaksi from "./pages/Kasir/Transaksi";

import Manajer from "./pages/Manajer/Manajer";
import UserM from "./pages/Manajer/User";

const App = () => (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/user" element={<User />} />
    <Route path="/admin/meja" element={<Meja />} />
    <Route path="/admin/menu" element={<Menu />} />

    <Route path="/kasir/transaksi" element={<Transaksi />} />

    <Route path="/manajer/manajer" element={<Manajer />} />
    <Route path="/manajer/user" element={<UserM />} />
  </Routes>
);
export default App;
