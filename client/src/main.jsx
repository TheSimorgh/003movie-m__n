import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter,HashRouter } from "react-router-dom";
import AllContextProvider from "./context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <HashRouter future={{ v7_startTransition: true }}>
 {/* <BrowserRouter>  */}
  <AllContextProvider>


      <React.StrictMode>
        <App />
      </React.StrictMode>


  </AllContextProvider>

   {/* </BrowserRouter>  */}
  </HashRouter>
);
