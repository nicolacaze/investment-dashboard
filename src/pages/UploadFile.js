import React from "react";
import { Link } from "react-router-dom";

import Form from "../components/Form";

const UploadFile = () => {
  return (
    <>
      <h1>This is Home</h1>
      <Link to="/">Back</Link>
      <Form />
    </>
  );
};

export default UploadFile;
