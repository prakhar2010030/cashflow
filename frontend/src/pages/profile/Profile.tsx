import { QRCodeCanvas } from "qrcode.react";
import Appbar from "../../components/AppBar";
import { useUserContext } from "../../contexts/UserContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useCallback, useEffect } from "react";
import axios from "axios";
const ProfilePage = () => {
  const { userState, setUserDetail } = useUserContext();
  const { getItem } = useLocalStorage();

  const getMyProfile = useCallback(async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${getItem("token")}`,
      },
    });
    // console.log("receiver ", res);
    setUserDetail(res.data.userDetail);
  }, []);
  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);
  return (
    <>
      <Appbar />
      <div className="max-w-sm md:max-w-3xl md:text-2xl  mx-auto mt-10 p-6 bg-slate-50 rounded-2xl shadow-md space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-center">
          User Profile
        </h2>
        <div className="md:flex space-y-6  md:justify-around ">
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

          <div className="flex flex-col justify-start items-center">
            <p className="font-semibold">Your QR Code</p>
            <QRCodeCanvas value={`${userState.id}`} size={200} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
