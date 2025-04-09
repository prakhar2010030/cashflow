// hooks/useToast.ts
import { useReducer, useCallback } from "react";

export interface ToastTypeInterface {
  isCalled: boolean;
  type: "success" | "error" | "";
  toastMsg: string;
}

const initialToastState: ToastTypeInterface = {
  isCalled: false,
  type: "",
  toastMsg: "",
};

type ToastAction =
  | { type: "SUCCESS"; msg: string }
  | { type: "ERROR"; msg: string }
  | { type: "RESET" };

const toastReducer = (
  state: ToastTypeInterface,
  action: ToastAction
): ToastTypeInterface => {
  switch (action.type) {
    case "SUCCESS":
      return { isCalled: true, type: "success", toastMsg: action.msg };
    case "ERROR":
      return { isCalled: true, type: "error", toastMsg: action.msg };
    case "RESET":
      return initialToastState;
    default:
      return state;
  }
};

export const useToast = () => {
  const [state, dispatch] = useReducer(toastReducer, initialToastState);

  const success = useCallback((msg: string) => {
    dispatch({ type: "SUCCESS", msg });
  }, []);

  const error = useCallback((msg: string) => {
    dispatch({ type: "ERROR", msg });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return {
    toastState: state,
    success,
    error,
    reset,
  };
};
