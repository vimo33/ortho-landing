import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/hanken-grotesk/wght.css";
import "./styles.css";
import App from "./App";

// Kapitel-Sprünge steuert die App selbst, der Browser soll keine alte Position wiederherstellen
history.scrollRestoration = "manual";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
