import React, { useEffect, useState } from "react";
import reactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import auth from "./utils/auth";
import { AuthProvider } from "./context/AuthContext";
import endpoint from "./utils/api";
import useFetch from "./hooks/useFetch";

import "./styles.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, response] = useFetch(endpoint + "/get-shares");
  const shares = (response && response.shares) || [];
  const champions = (response && response.champions) || [];

  const isLoggedIn = !!user && !!user.token;

  const login = async (email, password) => {
    return auth.login(email, password, true).then((user) => setUser(user));
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
    loading,
    user,
    isLoggedIn,
    login,
    logout,
  };

  useEffect(() => {
    const user = auth.currentUser();
    setUser(user);
  }, []);

  return (
    <AuthProvider value={value}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home champions={champions} shares={shares} />}
          />
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
