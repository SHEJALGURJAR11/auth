// src/components/Files.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./files.css"

function Files({ token }) {
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState("");
  const [fileToDownload, setFileToDownload] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:4200/files", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(response.data);
      } catch (error) {
        alert("Error fetching files");
      }
    };

    fetchFiles();
  }, [token]);

  const handleDownload = async (fileId) => {
    try {
      const response = await axios.post(
        "http://localhost:4200/download",
        { code: fileToDownload.code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Indicates file download
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileToDownload.filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("Error downloading file");
    }
  };

  return (
    <div>
      <h2 className="h2files">Your Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            {file.filename}
            <input className="filescss"
              type="text"
              placeholder="Enter code to download"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setFileToDownload({ ...file, code: e.target.value });
              }}
            />
            <button className="filesbtn" onClick={() => handleDownload(file._id)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Files;
