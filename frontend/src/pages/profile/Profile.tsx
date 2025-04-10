import { QRCodeCanvas } from "qrcode.react";
import Appbar from "../../components/AppBar";
import { useUserContext } from "../../contexts/UserContext";
const ProfilePage = () => {
 
  const { userState } = useUserContext();
  return (
    <>
      <Appbar />
      <div className="max-w-md text-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center">User Profile</h2>

        <div className="space-y-2">
          <div className=" flex justify-between">
            <span className="font-semibold">First Name:</span>{" "}
            <span>{userState.firstname}</span>
          </div>
          <div className=" flex justify-between">
            <span className="font-semibold">Last Name:</span>{" "}
            <span>{userState.lastname}</span>
          </div>
          <div className=" flex justify-between">
            <span className="font-semibold">Email:</span>{" "}
            <span>{userState.email}</span>
          </div>
          <div className=" flex justify-between">
            <span className="font-semibold">Balance:</span>{" "}
            <span>Rs {userState.balance}</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="my-4 font-semibold">Your QR Code</p>
          <QRCodeCanvas value={`https://yourapp.com/pay/${userState.id}`} size={200} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
