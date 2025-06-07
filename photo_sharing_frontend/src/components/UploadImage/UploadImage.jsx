import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../Authorization/UserProvider";
import { useNavigate } from "react-router-dom";



export const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [uploadedURL, setUploadedURL] = useState("");
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please choose a file");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", currentUser._id)
    try {
      // const res = await axios.post("https://ntnmm6-8081.csb.app/api/photo/uploadImg", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      axios.post("https://ntnmm6-8081.csb.app/api/photo/uploadImg", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res)=>{console.log(res.data);navigate(`/photos/${currentUser._id}`);});

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <>
      <h2>Upload Ảnh</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
};
