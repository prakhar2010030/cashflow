import { useReducer } from "react";

export type LoginState = {
  email: string;
  password: string;
};

const initialLoginState: LoginState = {
  email: "",
  password: "",
};

type Action =
  | { type: "UPDATE_FIELD"; field: keyof LoginState; value: string }
  | { type: "RESET"; state: LoginState };

const loginReducer = (state: LoginState, action: Action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.state;
  }
};

export const useLogin = () => {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  const updateLoginField = (name: keyof LoginState, value: string) => {
    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };
  const resetLoginEntry = () => {
    dispatch({ type: "RESET", state: initialLoginState });
  };

  return { loginStates: state, updateLoginField, resetLoginEntry };
};
