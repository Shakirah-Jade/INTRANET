import React, { useState } from "react";

export default function PopUp({ onCancel, onAddFolder }) {
  const [folderName, setFolderName] = useState("");

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleAddClick = () => {
    if (folderName.trim() !== "") {
      onAddFolder(folderName);
      setFolderName("");
    }
    console.log(folderName);
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
              value={folderName}
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
