import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AllContextProvider from "./context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AllContextProvider>
  <BrowserRouter>

      <React.StrictMode>
        <App />
      </React.StrictMode>

  </BrowserRouter>
  </AllContextProvider>
);
