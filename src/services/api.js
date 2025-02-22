import axios from "axios";

const API_BASE_URL =
  "https://grmva7buod.execute-api.us-east-2.amazonaws.com/dev";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = (userData) => api.post("/signup", userData);
export const login = (userData) => api.post("/login", userData);
export const getProfile = (token) =>
  api.get("/get-profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

//   Request a pre-signed URL from the backend aPI gateway
export const getPresignedUrl = async (filename, contentType, email, token) => {
  return api.post(
    "/upload-image",
    { filename, contentType, email },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

//  Upload file to S3 using pre-signed URL
export const uploadToS3 = async (uploadURL, file) => {
  return axios.put(uploadURL, file, {
    headers: { "Content-Type": file.type },
  });
};

//  Update user profile with image URL in DynamoDB
export const updateProfileImage = async (email, imageUrl, token) => {
  return api.post(
    "/update-profile",
    { email, imageUrl },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Combined function to handle the full upload process
export const uploadImage = async (file, email, token) => {
  try {
    const filename = file.name;
    const contentType = file.type;

    // Get a pre-signed URL
    const response = await getPresignedUrl(filename, contentType, email, token);
    console.log("filename:", filename);
    const { uploadURL, filePath } = response.data;

    // Upload the image to S3
    await uploadToS3(uploadURL, file);

    // Save the image URL in DynamoDB
    // const imageUrl = `https://bucket-for-profile-images.s3.us-east-2.amazonaws.com/${filePath}`;
    //just add filePath to imageUrl
    await updateProfileImage(email, filePath, token);

    return { status: 200, imageUrl: filePath };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { status: 500, error: error.message };
  }
};
