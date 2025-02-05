import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../services/api"; // Import uploadImage function

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email"); // Retrieve email from storage
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select an image first");
    if (!token) return alert("You must be logged in to upload an image");
    if (!email)
      return alert("Error retrieving user email. Please log in again.");

    try {
      const response = await uploadImage(file, email, token);
      console.log("upload response:", response);

      if (response.status === 200) {
        setMessage("Upload successful!");
        navigate("/profile");
      } else {
        setMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Upload failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto flex items-center justify-center flex-col h-full gap-y-8 mt-10">
      <h2 className="text-3xl">Upload Profile Image</h2>

      <input
        className="block w-64 p-2.5 my-2.5 mx-0 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        id="file_input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <button
        className="h-10 w-64 bg-blue-500 rounded-md text-white hover:bg-blue-700"
        onClick={handleUpload}
      >
        Upload
      </button>

      {message && <p className="text-lg text-gray-700">{message}</p>}
    </div>
  );
};

export default UploadImage;
