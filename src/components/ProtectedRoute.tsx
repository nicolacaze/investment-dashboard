import React from "react";
import { Navigate } from "react-router-dom";

import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAppContext();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div data-testid="protected-route">{children}</div>;
};

export default ProtectedRoute;
