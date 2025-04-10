import { useNavigate } from "react-router-dom";

export const useNavigates = () => {
  const navigate = useNavigate();

  const navigateTo = (to: string) => {
    navigate(to);
  };
  const navigateWithState = (to: string, state: any) => {
    navigate(to, state);
  };

  return { navigateTo, navigateWithState };
};
