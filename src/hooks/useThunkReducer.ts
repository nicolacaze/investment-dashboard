import { useReducer, useCallback, Dispatch } from "react";

const useThunkReducer = (reducer: () => AppState, initialState: AppState) => {
  const [state, dispatch]: [AppState, Dispatch<Action>] = useReducer(
    reducer,
    initialState
  );

  const thunkDispatch = useCallback(
    (action) => {
      if (typeof action === "function") {
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch]
  );

  return [state, thunkDispatch];
};

export default useThunkReducer;
