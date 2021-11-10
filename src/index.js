import React from "react";
import reactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-file" element={<UploadFile />} />
      </Routes>
    </Router>
  );
};

reactDOM.render(<App />, document.getElementById("root"));
