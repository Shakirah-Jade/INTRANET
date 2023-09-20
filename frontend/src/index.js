import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/fileupload.css";
import "./styles/homepage.css";
import "./styles/popup.css";
import "./styles/sharepage.css";
import "./styles/sidebar.css";
import "./styles/uploaded.css";
import "./styles/columnpage.css";
import App from "./App";
import { FilesContextProvider } from "./context/FileContext";
import { AuthContextProvider } from "./context/AuthContext";
import { DocumentsContextProvider } from "./context/DocumentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DocumentsContextProvider>
        <FilesContextProvider>
          <App />
        </FilesContextProvider>
      </DocumentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
