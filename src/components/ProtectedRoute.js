import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
