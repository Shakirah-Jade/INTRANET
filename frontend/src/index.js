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
import "./styles/welcomepage.css";
import "./styles/filepopup.css";
import App from "./App";
import { FilesContextProvider } from "./context/FileContext";
import { AuthContextProvider } from "./context/AuthContext";
import { DocumentsContextProvider } from "./context/DocumentContext";
import { FoldersContextProvider } from "./context/FolderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FoldersContextProvider>
        <DocumentsContextProvider>
          <FilesContextProvider>
            <App />
          </FilesContextProvider>
        </DocumentsContextProvider>
      </FoldersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
