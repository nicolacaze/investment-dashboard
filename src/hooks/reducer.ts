const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        ui: { loading: true },
      };
    case "FETCH_SHARES":
      return {
        ...state,
        ui: { loading: false },
        data: {
          champions: action.payload.champions,
          shares: action.payload.shares,
        },
      };
    case "ERROR":
      return {
        ...state,
        ui: { loading: false, error: action.payload.error },
      };
    case "SORT_SHARES":
      return {
        ...state,
        data: {
          ...state.data,
          shares: action.payload.shares,
        },
      };
    default:
      return state;
  }
};

export default reducer;
