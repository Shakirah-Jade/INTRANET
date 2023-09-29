import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFilesContext } from "../hooks/useFileContext";
import FileDetails from "./FileDetails";

const FileListOne = () => {
  const { files, dispatch } = useFilesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFiles = async () => {
      dispatch({ type: "SET_LOADING" });

      const response = await fetch("api/files/myfiles/", {
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

  return (
    // <div className="uploaded">
    //   <h2>Uploaded Files</h2>
    //   <div className="files">
    //     {files &&
    //       files.map((file) => <FileDetails file={file} key={file._id} />)}
    //   </div>
    // </div>
    <div className="uploaded">
      <h2>My Files</h2>
      <div className="table">
        <div className="table-header">
          <div className="table-cell">Name</div>
          <div className="table-cell">Owner</div>
          <div className="table-cell">Last Modified</div>
          <div className="table-cell">File Size</div>
          <div className="table-cell">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div className="table-body">
          {files &&
            files.map((file) => <FileDetails file={file} key={file._id} />)}
        </div>
      </div>
      {/* <div className="files"></div> */}
    </div>
  );
};

export default FileListOne;
