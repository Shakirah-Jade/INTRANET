import { useEffect } from "react";
import { useDocumentsContext } from "../hooks/useDocumentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import DocumentDetails from "../components/DocumentDetails";
import DocumentForm from "../components/DocumentForm";
import Sidebar from "../components/sideBar";
import Homepage from "./Homepage";

const Home = () => {
  const { documents, dispatch } = useDocumentsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch("/api/documents", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_DOCUMENTS", payload: json });
        console.log(json);
      }
    };

    if (user) {
      fetchDocuments();
    }
  }, [dispatch, user]);

  // Check if documents is null or undefined
  if (documents == null) {
    return <div className="home">Loading...</div>;
  }

  return (
    <div className="home">
      <div className="siding">
        <Sidebar />
      </div>
      {documents.null ? (
        <div className="documents">
          {documents &&
            documents.map((document) => (
              <DocumentDetails key={document._id} document={document} />
            ))}
        </div>
      ) : (
        <div>
          <Homepage />
        </div>
      )}
      <div className="forming">
        <DocumentForm />
      </div>
    </div>
  );
};

export default Home;
