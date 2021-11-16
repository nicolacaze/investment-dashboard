import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

import Table from "../components/Table";
import { useAuthContext } from "../context/AuthContext";

const Home = ({ shares }) => {
  const { isLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Failed to logout: %o", error);
    }
  };

  return (
    <>
      <h1>This is Home</h1>
      <Link to="/upload-file">Upload file</Link>
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
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
