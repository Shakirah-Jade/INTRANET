import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { DocumentsContextProvider } from "./context/DocumentContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DocumentsContextProvider>
        <App />
      </DocumentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
