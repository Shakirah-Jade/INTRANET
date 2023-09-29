import { createContext, useReducer } from "react";

export const FoldersContext = createContext();

const initialState = {
  folders: null, // Initial data
  loading: false,
  error: null,
};

export const foldersReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      console.log("FETCH_SUCCESS_FOLDERS");
      return {
        ...state,
        folders: action.payload,
        loading: false,
        error: null,
      };
    case "CREATE_FOLDER":
      return {
        ...state,
        folders: [action.payload, ...state.folders],
        loading: false,
        error: null,
      };
    case "FETCH_ERROR":
      console.log("FETCH_ERROR_FOLDERS");
      return {
        ...state,
        folders: [],
        loading: false,
        error: action.payload,
      };
    case "SET_LOADING":
      console.log("SET_LOADING_FOLDERS");
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const FoldersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(foldersReducer, initialState);

  return (
    <FoldersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FoldersContext.Provider>
  );
};
