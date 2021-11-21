import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div data-testid="protected-route">{children}</div>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
