import { useCallback, useReducer } from "react";

export interface FormInterface {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}
type Action =
  | { type: "UPDATE_FIELD"; field: keyof FormInterface; value: string }
  | { type: "RESET"; initialState: FormInterface };

const signUpReducer = (state: FormInterface, action: Action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      //   console.log(state, action);
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.initialState;
  }
};

const initialFormState: FormInterface = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
};

export const useSignup = () => {
  const [formState, dispatch] = useReducer(signUpReducer, initialFormState);

  const updateField = useCallback(
    (field: keyof FormInterface, value: string) => {
      dispatch({ type: "UPDATE_FIELD", field, value });
    },
    []
  );

  const resetSignup = useCallback(() => {
    dispatch({ type: "RESET", initialState: initialFormState });
  }, []);

  return { formState, updateField, resetSignup };
};
