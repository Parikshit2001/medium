import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Blog, Signup, Signin, Blogs, Publish } from "./pages";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/") navigate("/blogs");
  }, []);
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/publish" element={<Publish />} />
    </Routes>
  );
}

export default App;
