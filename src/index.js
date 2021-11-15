import React, { useEffect, useState } from "react";
import reactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";

import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { getShares } from "./utils/api";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [shares, setShares] = useState([]);
  const user = netlifyIdentity.currentUser();

  useEffect(() => {
    netlifyIdentity.init({
      locale: "en",
    });
    getShares()
      .then((shares) => setShares(shares))
      .catch((error) => console.log(error));
  }, []);

  return (
    <AuthProvider value={{ user }}>
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
