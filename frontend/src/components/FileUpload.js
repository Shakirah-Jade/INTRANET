import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const FileUpload = () => {
  const { user } = useAuthContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const parentFolder = "MyFiles";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file ? file.name : "");
    // Clear any previous error message when a new file is selected
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleUpload = () => {
    // Clear any previous error message when a new file is selected
    setErrorMessage("");
    setSuccessMessage("");
    if (!selectedFile) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("parentFolder", parentFolder);

    // Make a POST request to the backend to handle the file upload
    fetch("/api/files/upload", {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File uploaded successfully:", data);
        setSuccessMessage("File uploaded successfully!!");
        setSelectedFile(null);
        setSelectedFileName("");
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle error, e.g., show an error message
        setErrorMessage("Error uploading file. Please try again.");
      });
  };

  return (
    <div className="file-upload-container">
      <h2>Upload a File</h2>
      <label className="custom-file-input">
        Choose File
        <input type="file" onChange={handleFileChange} />
      </label>
      {selectedFileName && (
        <p className="selected-file">File "{selectedFileName}" chosen</p>
      )}
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default FileUpload;
