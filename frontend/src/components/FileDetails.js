import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";
import FilePopUp from "./filepopUp";

const FileDetails = ({ file }) => {
  const { user } = useAuthContext();
  const filename = file.filename;
  const [isFilePopupOpen, setIsFilePopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const openPopup = (e) => {
    if (isFilePopupOpen) {
      setIsFilePopupOpen(false);
      setPopupPosition({ top: e.clientY + 10, left: e.clientX });
    } else {
      setIsFilePopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsFilePopupOpen(false);
  };

  // Define a mapping of file extensions to corresponding icons
  const iconMap = {
    txt: <i className="fa-solid fa-file-lines"></i>,
    pdf: <i className="fa-solid fa-file-pdf" style={{ color: "#d60505" }}></i>,
    doc: <i className="fa-solid fa-file-word" style={{ color: "#3eb3fc" }}></i>,
    docx: (
      <i className="fa-solid fa-file-word" style={{ color: "#3eb3fc" }}></i>
    ),
    xls: (
      <i className="fa-solid fa-file-excel" style={{ color: "#217346" }}></i>
    ),
    xlsx: (
      <i className="fa-solid fa-file-excel" style={{ color: "#217346" }}></i>
    ),
    jpg: (
      <i className="fa-solid fa-file-image" style={{ color: "#3d3de1" }}></i>
    ),
    png: (
      <i className="fa-solid fa-file-image" style={{ color: "#3d3de1" }}></i>
    ),
    // Add more file types and corresponding icons as needed
  };
  const newfilename = filename.split(".");

  return (
    <div>
      <div className="table-row">
        <div className="table-cell">
          {iconMap[newfilename[1]]} &nbsp; {newfilename[0]}
        </div>
        <div className="table-cell">{file.username}</div>
        <div className="table-cell">
          {format(new Date(file.updatedAt), "MMM dd, yyyy")}
        </div>
        <div className="table-cell">{file.size / 1000} KB</div>
        <div className="table-cell">
          <div className="suffix" onClick={(e) => openPopup(e)}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
          <div
            className={isFilePopupOpen ? "filepopup.active" : "filepopup"}
            style={{ top: popupPosition.top, left: popupPosition.left }}
          >
            {/* Add logic for the New Folder popup dialog */}
            {isFilePopupOpen && <FilePopUp onClose={closePopup} file={file} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;
