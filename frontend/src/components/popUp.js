import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFoldersContext } from "../hooks/useFolderContext";

export default function PopUp({ onCancel }) {
  const [foldername, setFolderName] = useState("");
  const { user } = useAuthContext();
  const { dispatch } = useFoldersContext();

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleAddClick = async () => {
    if (foldername.trim() !== "") {
      const response = await fetch("/api/folders", {
        method: "POST",
        body: JSON.stringify({ foldername: foldername }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
      }
      if (response.ok) {
        dispatch({ type: "CREATE_FOLDER", payload: json });
      }
      setFolderName("");
    }
    onCancel();
  };
  const handleCloseClick = () => {
    onCancel();
  };

  const handleInputClick = (e) => {
    // Prevent the click event from bubbling up to the parent
    e.stopPropagation();
  };
  return (
    <>
      <div className="popup">
        <div className="overlay" onClick={handleCloseClick}>
          <div className="popup-dialog" onClick={(e) => e.stopPropagation()}>
            <h2>Create a New Folder</h2>
            <input
              type="text"
              placeholder="Folder Name"
              value={foldername}
              onChange={handleFolderNameChange}
              onClick={handleInputClick}
            />
            <button className="btn-close" onClick={handleCloseClick}>
              Cancel
            </button>
            <button className="btn-add" onClick={handleAddClick}>
              Add Folder
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
