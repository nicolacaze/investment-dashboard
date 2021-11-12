import React, { useEffect, useState } from "react";
import reactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import { getShares } from "./utils/api";

const App = () => {
  const [shares, setShares] = useState([]);

  useEffect(() => {
    getShares()
      .then((shares) => setShares(shares))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home shares={shares} />} />
        <Route path="/upload-file" element={<UploadFile />} />
      </Routes>
    </Router>
  );
};

reactDOM.render(<App />, document.getElementById("root"));
