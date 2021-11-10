import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table from "../components/Table";

const Home = ({ shares }) => {
  return (
    <>
      <h1>This is Home</h1>
      <Link to="/upload-file">Upload file</Link>
      <Table shares={shares} />
    </>
  );
};

Home.propTypes = {
  shares: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      ticker: PropTypes.string,
      industry: PropTypes.string,
      numberOfYears: PropTypes.number,
    })
  ),
};

export default Home;
