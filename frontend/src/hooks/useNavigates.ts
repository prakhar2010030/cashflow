import { useNavigate } from "react-router-dom";

export const useNavigates = () => {
  const navigate = useNavigate();

  const navigateTo = (to: string) => {
    navigate(to);
  };

  return { navigateTo };
};
