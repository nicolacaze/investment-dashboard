import { functionsEndpoint } from "../utils/api";
import { LOADING, FETCH_SHARES, ERROR } from "./actionTypes";

export const fetchShares = (dispatch) => {
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
