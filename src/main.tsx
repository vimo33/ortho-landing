import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../maurus";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
