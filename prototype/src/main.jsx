import React from "react";
import { createRoot } from "react-dom/client";
import { AppRouter } from "./AppRouter.jsx";
import "./tailwind.css";
import "./styles.css";
import "./layout-overrides.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
