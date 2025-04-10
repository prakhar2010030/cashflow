import { ChangeEvent, useCallback, useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
// import Button from "./Button";
import { useNavigates } from "../hooks/useNavigates";
import { preloadQrScanner } from "../utils/preloadScanner";
import { MdOutlineQrCodeScanner } from "react-icons/md";

type userType = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
};
export const Users = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState([]);
  const { getItem } = useLocalStorage();
  const { navigateTo } = useNavigates();

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/bulk?filter=${search}`,
        {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        }
      );
      // console.log(res);
      setUsers(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="w-[80%] m-auto">
      <div className="mt-6 flex  items-center justify-between">
        <div className="font-semibold text-md md:font-bold md:text-xl ">
          Users
        </div>
        <button
          className="bg-blue-950 cursor-pointer flex  md:flex-col md:items-center md:justify-center  text-white rounded-full h-8 w-8 md:h-15 md:w-15 "
          onClick={() => {
            preloadQrScanner();
            setTimeout(() => {
              navigateTo("/qrScanner");
            }, 100);
          }}
        >
          <div className="block m-auto md:hidden">
            <MdOutlineQrCodeScanner size={20} />
          </div>
          <div className="hidden md:block">
            <MdOutlineQrCodeScanner size={25} />
          </div>

          <span className="hidden md:block">scan</span>
        </button>
      </div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full md:text-xl px-2 py-1 border rounded border-slate-200"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        ></input>
      </div>
      <div className="overflow-y-scroll p-3 h-[60vh] hide-scrollbar">
        {users.map((user: userType) => (
          <UserCard user={user} key={user._id} />
        ))}
      </div>
      <div></div>
    </div>
  );
};
