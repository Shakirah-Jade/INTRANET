import React, { useEffect, useState } from "react";
import PopUp from "./popUp";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFoldersContext } from "../hooks/useFolderContext";

// const Sidebar = ({ activeMenuItem, onMenuItemClick, selectedFolder }) => {
const Sidebar = ({ activeMenuItem, onMenuItemClick, selectedFolder }) => {
  //State to manange the dialog visibility
  const [open, setOpen] = useState(false); //Control dropdown
  const [isPopupOpen, setPopupOpen] = useState(false);
  // const [folders, setFolders] = useState([]);
  const { user } = useAuthContext();
  const { folders, dispatch } = useFoldersContext();

  //Function to load all folders on start
  useEffect(() => {
    const fetchFolders = async () => {
      dispatch({ type: "SET_LOADING" });

      const response = await fetch("api/folders/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "FETCH_SUCCESS", payload: json.folders });
        // setFolders(json.folders);
      }
      if (!response.ok) {
        dispatch({ type: "FETCH_ERROR", payload: json });
      }
    };

    if (user) {
      fetchFolders();
    }
  }, [dispatch, user]);
  //Function to open the popup
  const openPopup = () => {
    setPopupOpen(true);
  };
  //Function to close the popup
  const closePopup = () => {
    setPopupOpen(false);
  };

  if (isPopupOpen) {
    document.body.classList.add("active-popup");
  } else {
    document.body.classList.remove("active-popup");
  }

  if (folders == null) {
    return <p>loading....</p>;
  }
  const numSubfolders = folders.length;

  return (
    <div className="sidebar">
      <div>
        <ul className="menu-items">
          <li className="menu-item" onClick={openPopup}>
            <i className="fas fa-plus"></i> New Folder
          </li>
          <div className="menu-item">
            <li
              className={activeMenuItem === "menu-item home" ? "active" : ""}
              onClick={() => onMenuItemClick("menu-item home")}
            >
              <i className="fas fa-home"></i> Home
            </li>
          </div>
          <div className="menu-item">
            <li
              className={activeMenuItem === "menu-item upload" ? "active" : ""}
              onClick={() => onMenuItemClick("menu-item upload")}
            >
              <i className="fas fa-upload"></i> Upload File
            </li>
          </div>
          <div className="menu-item">
            <li
              className={activeMenuItem === "menu-item share" ? "active" : ""}
              onClick={() => onMenuItemClick("menu-item share")}
            >
              <i className="fas fa-share"></i> Share
            </li>
          </div>
          <div className="menu-item">
            <li
              className={activeMenuItem === "menu-item myfiles" ? "active" : ""}
              onClick={() => onMenuItemClick("menu-item myfiles")}
            >
              <i className="fas fa-file-lines"></i> MyFiles
            </li>
          </div>
          <li className="menu-item">
            <i className="fas fa-folder-open"></i> Folders &nbsp;
            {numSubfolders} &nbsp;
            <i
              className={
                open
                  ? "fa-solid fa-circle-chevron-right dropping"
                  : "fa-solid fa-circle-chevron-right"
              }
              onClick={() => setOpen(!open)}
            ></i>
          </li>
          {/** Adding new folders dynamically */}
          {folders &&
            folders.map((folder) => (
              <li
                className={open ? "menu-item inner" : "menu-item closed"}
                key={folder.id}
                // onClick={() => selectedFolder(folder.foldername)}
              >
                <i className="fa-solid fa-folder"></i> {folder.foldername}
                &nbsp;&nbsp;&nbsp;
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </li>
            ))}
          <div className="menu-item">
            <li
              className={activeMenuItem === "menu-item trash" ? "active" : ""}
              onClick={() => onMenuItemClick("menu-item trash")}
            >
              <i className="fas fa-trash"></i> Trash
            </li>
          </div>

          <li className="menu-item">
            <i className="fas fa-life-ring"></i> Support
          </li>
          {/* Add logic for the New Folder popup dialog */}
          {isPopupOpen && <PopUp onCancel={closePopup} />}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
