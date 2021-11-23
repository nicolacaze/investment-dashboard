import React from "react";
import reactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import useFunction from "./hooks/useFunction";
import useIdentity from "./hooks/useIdentity";

import "./styles.css";

const App = () => {
  const [loading, response] = useFunction("/get-shares");
  const { user, isLoggedIn, login, logout } = useIdentity();
  const shares = (response && response.shares) || [];
  const champions = (response && response.champions) || [];

  const value = {
    loading,
    user,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthProvider value={value}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home champions={champions} shares={shares} />
              </ProtectedRoute>
            }
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
