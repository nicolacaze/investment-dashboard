import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({});

const AuthProvider = ({ value, children }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  value: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
