import React, { useEffect, useState } from "react";
import reactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { getShares } from "./utils/api";
import auth from "./utils/auth";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [shares, setShares] = useState([]);
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user && !!user.token;

  const login = async (email, password) => {
    return auth
      .login(email, password, true)
      .then((response) => setUser(response));
  };

  const logout = () => {
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
    isLoggedIn,
    login,
    logout,
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
