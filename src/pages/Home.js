import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table from "../components/Table";
import { useAuthContext } from "../context/AuthContext";

const Home = ({ shares }) => {
  const { user, logout } = useAuthContext();
  return (
    <>
      <h1>This is Home</h1>
      <Link to="/upload-file">Upload file</Link>
      <Link to="/login">Login</Link>
      {user && <button onClick={logout}>Log Out</button>}
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
