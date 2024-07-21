import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./pages/Dashboard/layout";
import UserProfile from "./pages/Dashboard/userprofile";
import ResetPassword from "./pages/Dashboard/resetpassword";
import SimpleDashboard from "./pages/Dashboard/simpledashboard";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/simpleDashboard" element={<SimpleDashboard />} />
      </Route>
    </Routes>
  );
}
