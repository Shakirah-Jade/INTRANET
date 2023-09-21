import { useState } from "react";
import { useDocumentsContext } from "../hooks/useDocumentsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const DocumentForm = () => {
  const { dispatch } = useDocumentsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const document = { title, description, author, size };

    const response = await fetch("/api/documents", {
      method: "POST",
      body: JSON.stringify(document),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setTitle("");
      setAuthor("");
      setDescription("");
      setSize("");
      setError(null);
      setEmptyFields([]);
      console.log("new document added", json);
      dispatch({ type: "CREATE_DOCUMENT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Document</h3>

      <label>Document Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Decsription: </label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <label>Author: </label>
      <input
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className={emptyFields.includes("author") ? "error" : ""}
      />

      <label>Size (KB): </label>
      <input
        type="number"
        onChange={(e) => setSize(e.target.value)}
        value={size}
        className={emptyFields.includes("size") ? "error" : ""}
      />

      <button>Add Document</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default DocumentForm;
