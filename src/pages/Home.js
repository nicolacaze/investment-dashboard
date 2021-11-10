import React from "react";
import Table from "../components/Table";
import { Link } from "react-router-dom";

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
