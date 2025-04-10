import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";

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

  const { removeItem, getItem } = useLocalStorage();

  const setUserDetail = (payload: UserState) => {
    dispatch({ type: "SET_DETAIL", payload });
  };

  const resetUserDetail = () => {
    dispatch({ type: "RESET_DETAIL", payload: initialUserState });
  };

  useEffect(() => {
    const token = getItem("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const user: UserState = res.data.userDetail;
          setUserDetail(user);
        })
        .catch((err) => {
          console.log(err);
          removeItem("token");
          resetUserDetail();
        });
    }
  }, []);

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
