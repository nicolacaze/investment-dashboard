import { useEffect, useReducer } from "react";

import { functionsEndpoint } from "../utils/api";

const initialState = {
  loading: false,
  response: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "RESPONSE_COMPLETE":
      return {
        ...state,
        loading: false,
        response: action.payload.data,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
  }
  return state;
};

const useFunction = (path) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOADING" });

    fetch(functionsEndpoint + path)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "RESPONSE_COMPLETE", payload: { data } });
      })
      .catch((error) => {
        console.log("ERROR", error);
        dispatch({ type: "ERROR", payload: { error } });
      });
  }, []);

  return [state.loading, state.response, state.error];
};

export default useFunction;
