import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/dashboard" exact element={<Dashboard />} />
    </Routes>
  );
}
