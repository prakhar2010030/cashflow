import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useNavigates } from "../hooks/useNavigates";
import { FiLogOut } from "../assets/icon";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Appbar = () => {
  const { navigateTo } = useNavigates();
  const { userState } = useUserContext();
  const { clearLocalStorage } = useLocalStorage();

  return (
    <div className="shadow text-xl h-14 flex justify-around">
      <div className="flex flex-col justify-center h-full ml-4">
        <Link to={"/dashboard"}>CashFlow</Link>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-2">Hello,</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-4">
          <div className="flex flex-col font-bold capitalize justify-center h-full text-xl">
            <button
              className="cursor-pointer"
              onClick={() => navigateTo("/profile")}
            >
              {userState.firstname[0]}
            </button>
          </div>
        </div>
        <div className="flex flex-col  capitalize justify-center text-xl">
          <button
            className="cursor-pointer"
            onClick={() => {
              clearLocalStorage();
              navigateTo("/signin");
            }}
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
