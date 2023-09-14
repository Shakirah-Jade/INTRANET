import React, { useState } from "react";
import "../styles/sidebar.css"; // You may need to import your CSS for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div>
        {/* {isOpen ? (
          <i className="fas fa-times"></i> // X icon
        ) : (
          <i className="fas fa-bars"></i> // 3 bars icon
        )} */}
        <ul className="menu-items">
          <li className="menu-item">
            <i className="fas fa-folder"></i> New Folder
          </li>
          <li className="menu-item">
            <i className="fas fa-home"></i> Home
          </li>
          <li className="menu-item">
            <i className="fas fa-trash"></i> Trash
          </li>
          <li className="menu-item">
            <i className="fas fa-folder-open"></i> Folders
          </li>
          <li className="menu-item">
            <i className="fas fa-life-ring"></i> Support
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
