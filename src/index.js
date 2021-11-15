import React, { useEffect, useState } from "react";
import reactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoTrue from "gotrue-js";

import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { getShares } from "./utils/api";
import { AuthProvider } from "./context/AuthContext";

const auth = new GoTrue({
  APIUrl: "https://awesome-kirch-f7213c.netlify.app/.netlify/identity",
  audience: "",
  setCookie: false,
});

const App = () => {
  const [shares, setShares] = useState([]);
  const [user, setUser] = useState(null);

  const handleLogin = (email, password) => {
    auth
      .login(email, password, true)
      .then((response) => setUser(response))
      .catch((error) => {
        console.log("Failed to login: %o", error);
      });
  };

  const handleLogout = () => {
    auth
      .currentUser()
      .logout()
      .then(() => setUser(null))
      .catch((error) => {
        console.log("Failed to logout user: %o", error);
        throw error;
      });
  };

  const value = {
    user,
    login: handleLogin,
    logout: handleLogout,
  };

  useEffect(() => {
    const user = auth.currentUser();
    setUser(user);
    getShares()
      .then((shares) => setShares(shares))
      .catch((error) => console.log(error));
  }, []);

  return (
    <AuthProvider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={<Home shares={shares} />} />
          <Route
            path="upload-file"
            element={
              <ProtectedRoute>
                <UploadFile />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

reactDOM.render(<App />, document.getElementById("root"));
