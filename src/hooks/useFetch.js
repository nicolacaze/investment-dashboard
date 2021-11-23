import { useEffect, useReducer } from "react";

const initialState = {
  loading: false,
  response: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        response: null,
        error: null,
      };
    case "RESPONSE_COMPLETE":
      return {
        loading: false,
        response: action.payload.response,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        response: null,
        error: action.payload.error,
      };
  }
  return state;
};

const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOADING" });

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: "RESPONSE_COMPLETE", payload: { response } });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", payload: { error } });
      });
  }, []);

  return [state.loading, state.response, state.error];
};

export default useFetch;
