// src/components/Upload.js
import React, { useState } from "react";
import axios from "axios";
import "./upload.css"

function Upload({ token }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:4200/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(`File uploaded with code: ${response.data.code}`);
    } catch (error) {
      alert("File upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 >Upload File</h2>
      <input  className="uploadcss" type="file" onChange={handleFileChange} />
     <div><button className="uploadbtn" type="submit">Upload</button></div> 
    </form>
  );
}

export default Upload;
