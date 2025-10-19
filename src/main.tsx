import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

// import your global stylesheet (Tailwind / index css)
import "./index.css";

const domain = import.meta.env.VITE_AUTH0_DOMAIN || "as-dev1.us.auth0.com";
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || "6WzUKKOKfqAN6FX53iO873XqtiXER96S";

console.log("Auth0 Config:", { domain, clientId, hasEnvDomain: !!import.meta.env.VITE_AUTH0_DOMAIN, hasEnvClientId: !!import.meta.env.VITE_AUTH0_CLIENT_ID });

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: "http://localhost:8080", scope: "openid profile email offline_access" }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
