import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Auth0Provider
    domain="dev-jdg-80iv.us.auth0.com"
    clientId="LgNM7cQF2LW2gdQmFilGbUBKXScv9fGL"
    redirectUri={window.location.origin}
    audience="https://dev.api.skateshop"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>
);
