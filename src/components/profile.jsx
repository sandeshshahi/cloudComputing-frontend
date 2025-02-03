import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await getProfile(token);
        setProfile(res.data);
        console.log(res.data);
      } catch (error) {
        alert("Failed to load profile");
      }
    };
    fetchProfile();
  }, [token, navigate]);

  return profile ? (
    <div className="mx-auto flex items-center justify-center flex-col h-full gap-y-8 mt-10">
      <div className="text-3xl">
        <h2>Profile</h2>
      </div>
      <p>Email: {profile.email}</p>
      <p>Name: {profile.name}</p>

      <img
        className="h-96 w-96 rounded-full object-cover object-center"
        src={profile.profileImage}
        alt="Profile"
      />

      <br />
      <button className="h-10 w-64 bg-blue-500 rounded-md text-white hover:cursor-pointer hover:bg-blue-700">
        <a href="/upload-image">Upload Profile Image</a>
      </button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Profile;
