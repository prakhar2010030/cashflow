import { createContext, ReactNode, useContext, useReducer } from "react";

// types
type UserState = {
  email: string;
  firstname: string;
  lastname: string;
  balance: number;
  id: string;
};

type Action =
  | { type: "SET_DETAIL"; payload: UserState }
  | { type: "RESET_DETAIL"; payload: UserState };

// reducer
const nameReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case "SET_DETAIL":
      return { ...state, ...action.payload };
    case "RESET_DETAIL":
      return action.payload;
  }
};

const initialUserState: UserState = {
  firstname: "",
  lastname: "",
  email: "",
  balance: 0,
  id: "",
};

// context type
interface UserContextType {
  userState: UserState;
  setUserDetail: (payload: UserState) => void;
  resetUserDetail: () => void;
}

// context creation
const UserContext = createContext<UserContextType | undefined>(undefined);

// provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(nameReducer, initialUserState);

  const setUserDetail = (payload: UserState) => {
    dispatch({ type: "SET_DETAIL", payload });
  };

  const resetUserDetail = () => {
    dispatch({ type: "RESET_DETAIL", payload: initialUserState });
  };

  return (
    <UserContext.Provider
      value={{ userState: state, setUserDetail, resetUserDetail }}
    >
      {children}
    </UserContext.Provider>
  );
};

// hook
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
