import { DocumentsContext } from "../context/DocumentContext";
import { useContext } from "react";

export const useDocumentsContext = () => {
  const context = useContext(DocumentsContext);

  if (!context) {
    throw Error(
      "useDocumentContext must be used inside a DocumentsContextProvider"
    );
  }

  return context;
};
