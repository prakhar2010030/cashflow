import { useState } from "react";
import Button from "./Button";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([
    {
      firstName: "prakhar",
      lastName: "kumar",
      _id: 1,
    },
  ]);
  const sendMoney = () => {
    // setUsers((prev) => [
    //   ...prev, // Keep the existing users
    //   {
    //     firstName: "pen",
    //     lastName: "newUser", // You can set this dynamically based on your need
    //     _id: prev.length + 1, // Generate a new unique ID for the new user
    //   },
    // ]);
  };

  return (
    <div className="w-[80%] m-auto">
      <div className="font-bold mt-6  text-xl">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full text-xl px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} onClick={sendMoney} />
        ))}
      </div>
    </div>
  );
};

interface UserObj {
  firstName: string;
  lastName: string;
}

interface UserProp {
  user: UserObj;
  onClick: () => void;
}
function User({ user, onClick }: UserProp) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col uppercase font-semibold justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col text-xl capitalize justify-center ">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button label={"Send Money"} onClick={onClick} />
      </div>
    </div>
  );
}
