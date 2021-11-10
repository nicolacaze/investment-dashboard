import React from "react";
import { Link } from "react-router-dom";

import Table from "../components/Table";

const Home = () => {
  return (
    <>
      <h1>This is Home</h1>
      <Link to="/upload-file">Upload file</Link>
      <Table />
    </>
  );
};

export default Home;
