import React from "react";
import PropTypes from "prop-types";

import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user, isLoggedIn, logout } = useAuthContext();
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
    <div className="flex w-full font-sans h-screen">
      <section className="min-w-min flex-initial p-8 bg-gray">
        <h1 className="text-3xl font-semibold mb-8">Wallet</h1>
        <div className="mb-6 flex flex-col items-center">
          <img
            className="rounded-full w-20 mb-3"
            src="https://semantic-ui.com/images/avatar/large/elliot.jpg"
            alt="avatar"
          />
          <p className="font-bold text-xl">{user.user_metadata.full_name}</p>
        </div>
        <nav className="flex flex-col">
          <Link to="/">Dashboard</Link>
          <Link to="/upload-file">Upload file</Link>
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {isLoggedIn && (
            <a href="#" onClick={handleLogout}>
              Log Out
            </a>
          )}
        </nav>
      </section>
      <section className="p-8 flex-1">{children}</section>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
