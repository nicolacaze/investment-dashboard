import React from "react";
import { Link } from "react-router-dom";

import Form from "../components/Form";

const UploadFile = () => {
  return (
    <>
      <h1>Upload file</h1>
      <Link to="/">Back</Link>
      <Link to="/login">Log in</Link>
      <Form />
    </>
  );
};

export default UploadFile;
