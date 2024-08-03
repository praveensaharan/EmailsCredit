import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { CreditsProvider } from "./ContextApi/CreditsContext.jsx";
const PUBLISHABLE_KEY = "pk_test_bmV4dC1kb2ctMjIuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <CreditsProvider>
        <App />
      </CreditsProvider>
    </ClerkProvider>
  </React.StrictMode>
);
