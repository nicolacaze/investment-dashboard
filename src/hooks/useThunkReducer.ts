import { useReducer, useCallback, Dispatch } from "react";

type ThunkAction = Action | ((dispatch: Dispatch<Action>) => void);

const useThunkReducer = (reducer: () => AppState, initialState: AppState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = useCallback(
    (action: ThunkAction) => {
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
