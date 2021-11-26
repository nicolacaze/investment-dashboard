import { functionsEndpoint } from "../utils/api";
import { LOADING, FETCH_SHARES, ERROR, SORT_SHARES } from "./actionTypes";

export const fetchShares = () => (dispatch) => {
  dispatch({ type: LOADING });
  fetch(functionsEndpoint + "/get-shares")
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: FETCH_SHARES,
        payload: { champions: data.champions, shares: data.shares },
      });
    })
    .catch((error) => {
      dispatch({ type: ERROR, payload: { error } });
    });
};

export const sortBy = (shares, order, column) => (dispatch) => {
  let sortedShares;
  if (order === "ASC") {
    sortedShares = shares.sort((a, b) => a[column] - b[column]);
  } else if (order === "DESC") {
    sortedShares = shares.sort((a, b) => b[column] - a[column]);
  }
  dispatch({ type: SORT_SHARES, payload: { shares: sortedShares } });
};
