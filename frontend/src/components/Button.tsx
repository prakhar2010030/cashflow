import { useUserContext } from "../contexts/UserContext";
import Loader from "./Loader";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  const { loading } = useUserContext();
  return (
    <button
      onClick={onClick}
      disabled={loading}
      type="button"
      className="cursor-pointer text-white md:text-xl w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg p-1 md:px-5 md:py-2.5  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-300 dark:border-gray-300"
    >
      {loading ? <Loader /> : label}
    </button>
  );
};

export default Button;
