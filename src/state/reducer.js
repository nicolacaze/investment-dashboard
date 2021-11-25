import { LOADING, FETCH_SHARES, ERROR } from "./actionTypes";

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
  }
  return state;
};

export default reducer;
