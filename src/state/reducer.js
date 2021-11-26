import { LOADING, FETCH_SHARES, ERROR, SORT_SHARES } from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        ui: { loading: true },
      };
    case FETCH_SHARES:
      return {
        ...state,
        ui: { loading: false },
        data: {
          champions: action.payload.champions,
          shares: action.payload.shares,
        },
      };
    case ERROR:
      return {
        ...state,
        ui: { loading: false, error: action.payload.error },
      };
    case SORT_SHARES:
      return {
        ...state,
        data: {
          ...state.data,
          shares: action.payload.shares,
        },
      };
  }
  return state;
};

export default reducer;
