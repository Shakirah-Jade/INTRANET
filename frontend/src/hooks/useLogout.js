import { useAuthContext } from "./useAuthContext";
import { useDocumentsContext } from "./useDocumentsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchDocuments } = useDocumentsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchDocuments({ type: "SET_DOCUMENTS", payload: null });
  };
  return { logout };
};
