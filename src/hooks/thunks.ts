import { Dispatch } from "react";
import { functionsEndpoint } from "../utils/api";

export const fetchShares = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: "LOADING" });
  fetch(functionsEndpoint + "/get-shares")
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: "FETCH_SHARES",
        payload: { champions: data.champions, shares: data.shares },
      });
    })
    .catch((error) => {
      dispatch({ type: "ERROR", payload: { error } });
    });
};

type Order = "ASC" | "DESC";

type Column = "dividendYield" | "numberOfYears" | "price";

export const sortBy =
  (shares: Share[], order: Order, column: Column) =>
  (dispatch: Dispatch<Action>) => {
    let sortedShares: Share[];
    if (order === "ASC") {
      sortedShares = shares.sort((a, b) => a[column] - b[column]);
    } else if (order === "DESC") {
      sortedShares = shares.sort((a, b) => b[column] - a[column]);
    }
    dispatch({ type: "SORT_SHARES", payload: { shares: sortedShares } });
  };
