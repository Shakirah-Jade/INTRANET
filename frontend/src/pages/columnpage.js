import React from "react";
import "../styles/columnpage.css";

function ColumnPage() {
  // Sample data as an array of objects, where each object represents a row
  const data = [
    {
      id: 1,
      name: "File 1",
      owner: "User A",
      lastModified: "2023-09-25",
      fileSize: "2.5 MB",
    },
    {
      id: 2,
      name: "File 2",
      owner: "User B",
      //   lastModified: "2023-09-24",
      //   fileSize: "1.8 MB",
    },
    {
      id: 3,
      name: "File 3",
      //   owner: "User C",
      //   lastModified: "2023-09-23",
      // fileSize is missing for this row
    },
    // Add more data rows as needed
  ];

  return (
    <div className="column-container">
      {/* Render column headings */}
      <div className="column">
        <h2>Name</h2>
        {data.map((item) => (
          <p key={item.id}>{item.name || "-"}</p>
        ))}
      </div>
      <div className="column">
        <h2>Owner</h2>
        {data.map((item) => (
          <p key={item.id}>{item.owner || "-"}</p>
        ))}
      </div>
      <div className="column">
        <h2>Last Modified</h2>
        {data.map((item) => (
          <p key={item.id}>{item.lastModified || "-"}</p>
        ))}
      </div>
      <div className="column">
        <h2>File Size</h2>
        {data.map((item) => (
          <p key={item.id}>{item.fileSize || "-"}</p>
        ))}
      </div>
      <div className="column">
        {/* <h2>Options</h2> */}
        <i className="fa-solid fa-ellipsis-vertical"></i>
        {data.map(() => (
          <p>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </p>
        ))}
      </div>
    </div>
  );
}

export default ColumnPage;
