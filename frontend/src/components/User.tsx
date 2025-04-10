import { ChangeEvent, useCallback, useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Button from "./Button";
import { useNavigates } from "../hooks/useNavigates";
import { preloadQrScanner } from "../utils/preloadScanner";

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
      <div className="font-bold mt-6  text-xl">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full text-xl px-2 py-1 border rounded border-slate-200"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        ></input>
      </div>
      <div>
        {users.map((user: userType) => (
          <UserCard user={user} key={user._id} />
        ))}
      </div>
      <div>
        <Button
          label="scan"
          onClick={() => {
            preloadQrScanner();
            setTimeout(() => {
              navigateTo("/qrScanner");
            }, 100);
          }}
        />
      </div>
    </div>
  );
};
