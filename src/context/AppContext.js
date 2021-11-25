import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

const AppContext = createContext({});

const AppProvider = ({ value, children }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  value: PropTypes.object.isRequired,
  children: PropTypes.node,
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
