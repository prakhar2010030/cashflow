import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { useNavigates } from "../hooks/useNavigates";
import { FiLogOut, TbMoneybag } from "../assets/icon";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Appbar = () => {
  const { navigateTo } = useNavigates();
  const { userState } = useUserContext();
  const { clearLocalStorage } = useLocalStorage();

  return (
    <div className="shadow md:text-xl h-10 md:h-14 flex justify-around">
      <div className="flex flex-col justify-center h-full ml-4">
        <Link to={"/dashboard"}>
          <div className="hidden md:block">
            <TbMoneybag size={30} />
          </div>
          <div className="block md:hidden">
            <TbMoneybag size={20} />
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between ">
        <div className="mr-2">Hello,</div>
        <div className="rounded-full h-8 w-8 md:h-12 md:w-12 bg-slate-200 flex justify-center mt-1 mr-4">
          <div className="capitalize flex items-center justify-center md:font-bold text-md md:text-xl">
            <button
              className="cursor-pointer m-auto"
              onClick={() => navigateTo("/profile")}
            >
              {userState.firstname[0]}
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center text-xl">
          <button
            className="cursor-pointer"
            onClick={() => {
              const res = confirm("will be logged out!!");
              if (res) {
                // console.log(res)
                clearLocalStorage();
                navigateTo("/signin");
              }
            }}
          >
            <div className="hidden md:block">
              <FiLogOut size={30} />
            </div>
            <div className="block md:hidden">
              <FiLogOut size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
