import React, { useState } from "react";
import "../styles/homepage.css";

function Homepage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [notification, setNotification] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file ? file.name : ""); // Set the selected file name or an empty string
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setNotification("Please select a file before uploading.");
    } else {
      const uploadedFileName = selectedFile.name;
      setNotification(`File "${uploadedFileName}" uploaded successfully!`);
    }
  };

  return (
    <div className="pagehome">
      <div className="background-image">
        <div className="content">
          <h1>Welcome to Your Homepage</h1>
          <p>Get started with our amazing platform.</p>
          <div className="file-upload">
            <label htmlFor="file-upload" className="custom-file-upload">
              Choose File
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .pdf"
            />
            {selectedFileName && (
              <p className="selected-file">{selectedFileName}</p>
            )}
          </div>
          <button onClick={handleUpload} className="upload-button">
            Upload
          </button>
          {notification && <p className="notification">{notification}</p>}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
