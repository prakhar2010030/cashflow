import { JSX } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Navigate } from "react-router-dom";

interface ProtectProps {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: ProtectProps) => {
  const { getItem } = useLocalStorage();
  const token = getItem("token");

  return !token ? <Navigate to={"/signin"} /> : children;
};

export default ProtectedRoute;
