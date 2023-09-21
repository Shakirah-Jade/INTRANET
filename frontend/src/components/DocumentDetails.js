import { useDocumentsContext } from "../hooks/useDocumentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const DocumentDetails = ({ document }) => {
  const { dispatch } = useDocumentsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/documents/" + document._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_DOCUMENT", payload: json });
    }
  };
  return (
    <div className="document-details">
      <h4>{document.title}</h4>
      <p>
        <strong>Description: </strong>
        {document.description}
      </p>
      <p>
        <strong>Author: </strong>
        {document.author}
      </p>
      <p>
        <strong>Size (KB): </strong>
        {document.size}
      </p>
      <p>
        {formatDistanceToNow(new Date(document.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default DocumentDetails;
