import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CityProvider } from "./context/CityProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CityProvider>
      <App />
    </CityProvider>
  </React.StrictMode>
);
