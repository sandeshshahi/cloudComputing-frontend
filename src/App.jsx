import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Profile from "./components/profile";
import UploadImage from "./components/uploadImage";

function App() {
  return (
    <div className="h-full w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload-image" element={<UploadImage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
