import React, { useEffect, useState } from "react";
import reactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";

import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Login from "./pages/Login";
import { getShares } from "./utils/api";

const App = () => {
  const [shares, setShares] = useState([]);
  const user = netlifyIdentity.currentUser();

  useEffect(() => {
    netlifyIdentity.init({
      locale: "en",
    });

    console.log(netlifyIdentity.currentUser());
    getShares()
      .then((shares) => setShares(shares))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home shares={shares} />} />
        <Route
          path="upload-file"
          element={
            user && user.token ? <UploadFile /> : <Navigate to="/login" />
          }
        />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
};

reactDOM.render(<App />, document.getElementById("root"));
