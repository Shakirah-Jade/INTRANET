import React, { useState, useRef } from "react";

function SharePage() {
  const [recipient, setRecipient] = useState("");
  const [file, setFile] = useState(null);
  const [fileSelectedNotification, setFileSelectedNotification] = useState("");
  const [shareNotification, setShareNotification] = useState("");
  const fileInputRef = useRef(null);

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setFileSelectedNotification(`Selected file: ${selectedFile.name}`);
    } else {
      setFileSelectedNotification("No file selected");
    }
  };

  const handleShare = (e) => {
    e.preventDefault();

    if (!recipient || !file) {
      setShareNotification("Please enter a recipient and select a file.");
      return;
    }

    // Check if the file exists (You may need server-side logic for this)
    const fileExists = true; // Implement your logic here

    if (!fileExists) {
      setShareNotification("The selected file does not exist.");
      return;
    }

    // Simulate sharing the file (You should implement your own logic here)
    setTimeout(() => {
      setShareNotification(
        `File ${file.name} shared with ${recipient} successfully!`
      );
    }, 2000);
  };

  const handleCancel = () => {
    setRecipient("");
    setFile(null);
    setFileSelectedNotification("");
    setShareNotification("");
  };

  return (
    <div className="sharepage">
      <form onSubmit={handleShare}>
        <label htmlFor="recipient">Recipient (Email or Username):</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={handleRecipientChange}
          required
        />

        <div className="file-input-container">
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="file-input-button"
          >
            <i class="fa-solid fa-share"></i> Choose File
          </button>
          <input
            type="file"
            id="file"
            accept="*/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
            required
          />
        </div>

        <div className="notification">{fileSelectedNotification}</div>

        <button type="submit">Share</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>

      <div className="notification">{shareNotification}</div>
    </div>
  );
}

export default SharePage;
