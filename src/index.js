import React, { useEffect } from "react";
import reactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider } from "./context/AppContext";
import useThunkReducer from "./hooks/useThunkReducer";
import useIdentity from "./hooks/useIdentity";
import initialState from "./state/initialState";
import reducer from "./state/reducer";
import { fetchShares } from "./state/thunks";

import "./styles.css";

const App = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { user, isLoggedIn, login, logout } = useIdentity();
  const { ui, data } = state;

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    dispatch,
  };

  useEffect(() => {
    dispatch(fetchShares());
  }, [dispatch]);

  return (
    <AppProvider value={value}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home
                  loading={ui.loading}
                  champions={data.champions}
                  shares={data.shares}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="upload-file"
            element={
              <ProtectedRoute>
                <UploadFile />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

reactDOM.render(<App />, document.getElementById("root"));
