import React, { createContext, useContext, ReactNode } from "react";

type User = {
  user_metadata: {
    full_name: string;
  };
};

type IdentityContext = {
  user: User;
  isLoggedIn: boolean;
  login?: Function;
  logout?: Function;
  dispatch?: Function;
};

const defaultContext = {
  user: {
    user_metadata: {
      full_name: "",
    },
  },
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
