import React, { createContext, useContext, ReactNode } from "react";

type IdentityContext = {
  user: {};
  isLoggedIn: boolean;
  login?: Function;
  logout?: Function;
  dispatch?: Function;
};

const defaultContext = {
  user: {},
  isLoggedIn: false,
};

const AppContext = createContext<IdentityContext>(defaultContext);

const AppProvider = ({
  value,
  children,
}: {
  value: IdentityContext;
  children: ReactNode;
}) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
