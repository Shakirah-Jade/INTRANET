import { useState } from "react";
import { useFilesContext } from "../hooks/useFileContext";
import { useAuthContext } from "../hooks/useAuthContext";

const FileForm = () => {
  const { dispatch } = useFilesContext();
  const { user } = useAuthContext();
  const parentFolder = "MyFiles";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file ? file.name : "");
    // Clear any previous error message when a new file is selected
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear any previous error message when a new file is selected
    setErrorMessage("");
    setSuccessMessage("");
    if (!selectedFile) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("parentFolder", parentFolder);
    formData.append("title", title);
    formData.append("description", description);

    //Upload new document
    dispatch({ type: "SET_LOADING" });
    const response = await fetch("/api/files/upload", {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setErrorMessage("Error uploading file. Please try again.");
      // setEmptyFields(json.emptyFields);
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
      console.log("File uploaded successfully:", json);
      setSuccessMessage("File uploaded successfully!!");
      setSelectedFile(null);
      setSelectedFileName("");
      dispatch({ type: "FETCH_SUCCESS", payload: json.file });
      window.location.reload();
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New File</h3>

      <label>File Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Description: </label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />
      <label className="custom-file-input">
        Choose File
        <input type="file" onChange={handleFileChange} />
      </label>
      {selectedFileName && (
        <p className="selected-file">File "{selectedFileName}" chosen</p>
      )}
      <button className="upload-button">Upload</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default FileForm;
