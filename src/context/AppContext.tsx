import React, { createContext, useContext, ReactNode } from "react";

type IdentityContext = {
  dispatch: () => void;
};

const AppContext = createContext<IdentityContext | {}>({});

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
