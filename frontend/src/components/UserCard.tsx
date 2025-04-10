import { memo } from "react";
import Button from "./Button";
import { useNavigates } from "../hooks/useNavigates";

export interface UserObj {
  firstName: string;
  lastName: string;
  _id: string;
}

interface UserProp {
  user: UserObj;
}
const UserCard = ({ user }: UserProp) => {
  const { navigateWithState } = useNavigates();
  const sendMoney = () => {
    navigateWithState("/send", { state: { id: user._id } });
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="rounded-full h-6 w-6 md:h-12 md:w-12 bg-slate-200 flex justify-center md:mt-1 mr-2">
            <div className="flex flex-col uppercase font-semibold justify-center h-full md:text-xl">
              {user.firstName[0]}
            </div>
          </div>
          <div className="flex flex-col md:text-xl capitalize justify-center">
            <div>
              {user.firstName} {user.lastName}
            </div>
          </div>
        </div>

        <div className="">
          <div className="my-2">
            <Button label={"Send Money"} onClick={sendMoney} />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(UserCard);
