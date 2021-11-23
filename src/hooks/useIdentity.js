import { useEffect, useReducer } from "react";
import GoTrue from "gotrue-js";

import { identityEndpoint } from "../utils/api";

const auth = new GoTrue({
  APIUrl: identityEndpoint,
  audience: "",
  setCookie: false,
});

const initialState = {
  user: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload.user };
    case "LOGOUT_USER":
      return { ...state, user: null };
    case "USER_ERROR":
      return { ...state, error: action.payload.error };
  }
  return state;
};

const useIdentity = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isLoggedIn = !!state.user && !!state.user.token;

  const login = async (email, password) => {
    return auth
      .login(email, password, true)
      .then((user) => dispatch({ type: "SET_USER", payload: { user } }))
      .catch((error) => dispatch({ type: "USER_ERROR", payload: { error } }));
  };

  const logout = () => {
    return auth
      .currentUser()
      .logout()
      .then(() => dispatch({ type: "LOGOUT_USER" }))
      .catch((error) => dispatch({ type: "USER_ERROR", payload: { error } }));
  };

  useEffect(() => {
    const user = auth.currentUser();
    dispatch({ type: "SET_USER", payload: { user } });
  }, []);

  return { user: state.user, isLoggedIn, login, logout };
};

export default useIdentity;
