import React, { useState } from "react";
import { useFoldersContext } from "../hooks/useFolderContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFilesContext } from "../hooks/useFileContext";

const FilePopUp = ({ onClose, file }) => {
  const { folders } = useFoldersContext();
  const { files, dispatch } = useFilesContext();
  const { user } = useAuthContext();

  const [isMiniPopupOpen, setIsMiniPopupOpen] = useState(false);
  const [isSecondMiniPopupOpen, setSecondIsMiniPopupOpen] = useState(false);
  const MiniPopup = () => {
    return (
      <div className={isMiniPopupOpen ? "mini-popup.active" : "mini-popup"}>
        <div className="mini-popup-inner">
          {/** Adding new folders dynamically */}
          <div>
            {folders &&
              folders.map((folder, index) => (
                <div className="menu-item" key={index}>
                  <i className="fa-solid fa-folder"></i> {folder.foldername}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };
  const handleMiniClick = () => {
    if (isMiniPopupOpen) {
      setIsMiniPopupOpen(false);
    } else {
      setIsMiniPopupOpen(true);
    }
  };
  const handleSecondMiniClick = () => {
    if (isSecondMiniPopupOpen) {
      setSecondIsMiniPopupOpen(false);
    } else {
      setSecondIsMiniPopupOpen(true);
    }
  };

  const ConfirmDialogBox = ({ file }) => {
    const handleAddClick = async () => {
      const trashingUrl = `api/files/trashing/${file.id}`;
      console.log("The URL is", trashingUrl);
      if (file.id !== null) {
        const response = await fetch(trashingUrl, {
          method: "PATCH",
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
          dispatch({ type: "TRASH_FILES", payload: json.files });
        }
        console.log("U've added the folder", file.id);
      }

      setSecondIsMiniPopupOpen(false);
      setIsMiniPopupOpen(false);
      onClose();
    };
    const handleCloseClick = () => {
      setSecondIsMiniPopupOpen(false);
    };

    if (isSecondMiniPopupOpen) {
      document.body.classList.add("active-popup");
    } else {
      document.body.classList.remove("active-popup");
    }
    const handleInputClick = (e) => {
      // Prevent the click event from bubbling up to the parent
      e.stopPropagation();
    };
    return (
      <>
        <div className="popup">
          <div className="overlay" onClick={handleCloseClick}>
            <div className="popup-dialog" onClick={(e) => e.stopPropagation()}>
              <h2>Are You Sure you want to Trash this file?</h2>
              <button className="btn-close" onClick={handleCloseClick}>
                Cancel
              </button>
              <button className="btn-add" onClick={handleAddClick}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  //Function to download
  const handleDownload = () => {
    const downloadUrl = `api/files/download/${file.id}`; // Adjust the URL to match your backend route
    fetch(downloadUrl, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a URL for the blob data and trigger a download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };
  return (
    <div className="filepopup-inner">
      <div className="menu-item" onClick={handleDownload}>
        <span class="material-symbols-outlined">download</span> Download
      </div>
      <div className="menu-item" onClick={handleMiniClick}>
        <span class="material-symbols-outlined">drive_file_move</span> Move to
        folder
      </div>
      <div className="menu-item" onClick={handleSecondMiniClick}>
        <span class="material-symbols-outlined">delete</span> Move to Trash
      </div>

      <button onClick={onClose} className="btn-filepopup">
        Close
      </button>
      {isMiniPopupOpen && <MiniPopup />}
      {isSecondMiniPopupOpen && <ConfirmDialogBox file={file} />}
    </div>
  );
};

export default FilePopUp;
