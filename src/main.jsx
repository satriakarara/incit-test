import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routes.jsx";

ReactDOM.createRoot(document.getElementById("mainApp")).render(
  <GoogleOAuthProvider clientId="1086314629522-ghbvrrtpu2ik5mba14ca92rg5rgcgmo1.apps.googleusercontent.com">
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
