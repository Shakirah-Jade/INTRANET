import { useEffect } from "react";
import { useFilesContext } from "../hooks/useFileContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Homepage from "../components/Homepage";
import FileListAll from "./FileListAll";

const DecisionPage = () => {
  const { files, dispatch } = useFilesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFiles = async () => {
      dispatch({ type: "SET_LOADING" });

      const response = await fetch("api/files/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json.files);

      if (response.ok) {
        dispatch({ type: "FETCH_SUCCESS", payload: json.files });
      }
      if (!response.ok) {
        dispatch({ type: "FETCH_ERROR", payload: json });
      }
    };

    if (user) {
      fetchFiles();
    }
  }, [dispatch, user]);

  // Check if documents is null or undefined
  if (files == null) {
    return <div className="home">Loading...</div>;
  }
  if (files.length > 0) {
    return <FileListAll />;
  } else {
    return <Homepage />;
  }
};

export default DecisionPage;
