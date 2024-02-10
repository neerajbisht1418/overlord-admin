import React, { useState } from 'react';
import axios from 'axios';
import { IoCloudDoneOutline } from "react-icons/io5";

const YourComponent = (props) => {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [image, setImage] = useState(null);

 const handleUpload = async (event) => {
  const file = event.target.files[0];

  try {
   setLoading(true);
   const imageUrl = await uploadToCloudinary(file);
   setImage(imageUrl);
   props.setDocumentUrl(imageUrl)
  } catch (error) {
   setError("Error uploading image. Please try again.");
  } finally {
   setLoading(false);
  }
 };

 const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "vmywgt1o");
  const publicId = `overlord/${file?.name}`;
  formData.append("public_id", publicId);

  const response = await axios.post(
   "https://api.cloudinary.com/v1_1/ddrvpin2u/image/upload",
   formData
  );

  return response.data.url;
 };

 return (
  <div>
   <input type="file" onChange={handleUpload} />
   {loading && <p>Uploading...</p>}
   {/* {error && <p>{error}</p>} */}
   {image && (
    <>
     <div className='flex justify-start items-center gap-2 mt-1 text-green-400'>
      <IoCloudDoneOutline />
      Uploaded
     </div>

    </>
   )}
  </div>
 );
};

export default YourComponent;
