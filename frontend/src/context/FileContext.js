import { createContext, useReducer } from "react";

export const FilesContext = createContext();

const initialState = {
  files: null, // Initial data
  loading: false,
  error: null,
};

export const filesReducer = (state, action) => {
  switch (action.type) {
    // case "SET_FILES":
    //   console.log("From File Context", action.payload);
    //   return {
    //     files: action.payload,
    //   };
    // case "CREATE_FILE":
    //   return {
    //     files: [action.payload, ...state.files],
    //   };
    case "FETCH_SUCCESS":
      console.log("FETCH_SUCCESS");
      return {
        ...state,
        files: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ERROR":
      console.log("FETCH_ERROR");
      return {
        ...state,
        files: [],
        loading: false,
        error: action.payload,
      };
    case "SET_LOADING":
      console.log("SET_LOADING");
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const FilesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filesReducer, initialState);

  return (
    <FilesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FilesContext.Provider>
  );
};
