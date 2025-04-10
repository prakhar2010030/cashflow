import { memo } from "react";
import Button from "./Button";
import { useNavigates } from "../hooks/useNavigates";

export interface UserObj {
  firstName: string;
  lastName: string;
}

interface UserProp {
  user: UserObj;
}
const UserCard = ({ user }: UserProp) => {
  const { navigateWithState } = useNavigates();
  const sendMoney = () => {
    navigateWithState("/send", { state: user });
  };
  return (
    <>
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

        <div className="flex flex-row justify-bewteen  ">
          <div>
            <Button label={"Send Money"} onClick={sendMoney} />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(UserCard);
