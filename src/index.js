import React, { useEffect, useReducer } from "react";
import reactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UploadFile from "./pages/UploadFile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { getShares } from "./utils/api";
import auth from "./utils/auth";
import { AuthProvider } from "./context/AuthContext";

import "./styles.css";

const initialState = {
  user: null,
  data: {
    champions: [],
    shares: [],
  },
};

const SET_USER = "SET_USER";
const GET_SHARES = "GET_SHARES";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload.user };
    case GET_SHARES:
      return {
        ...state,
        data: {
          champions: action.payload.champions,
          shares: action.payload.shares,
        },
      };
  }
  return state;
};

const setUser = (data) => {
  if (!data) {
    return { type: SET_USER, payload: { user: null } };
  }
  return { type: SET_USER, payload: { user: data } };
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isLoggedIn = !!state.user && !!state.user.token;

  const login = async (email, password) => {
    return auth
      .login(email, password, true)
      .then((user) => dispatch(setUser(user)));
  };

  const logout = () => {
    auth
      .currentUser()
      .logout()
      .then(() => dispatch(setUser(null)))
      .catch((error) => {
        console.log("Failed to logout user: %o", error);
        throw error;
      });
  };

  const value = {
    user: state.user,
    isLoggedIn,
    login,
    logout,
  };

  useEffect(() => {
    const user = auth.currentUser();
    dispatch(setUser(user));
    getShares()
      .then(({ champions, shares }) => {
        dispatch({ type: GET_SHARES, payload: { champions, shares } });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <AuthProvider value={value}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                champions={state.data.champions}
                shares={state.data.shares}
              />
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
    </AuthProvider>
  );
};

reactDOM.render(<App />, document.getElementById("root"));
