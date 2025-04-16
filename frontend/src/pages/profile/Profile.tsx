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
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {userState.firstname} {userState.lastname}
                </h1>
                <p className="text-blue-100 mt-1">{userState.email}</p>
              </div>
              <div className="bg-white/10 p-3 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="bg-white rounded-b-2xl shadow-lg p-6 md:p-8">
            <div className="md:flex md:space-x-8">
              {/* User Information */}
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-lg md:text-xl font-bold mb-6 text-gray-800 border-b pb-2">
                  Account Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">First Name</span>
                    <span className="font-semibold text-gray-800">{userState.firstname}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Last Name</span>
                    <span className="font-semibold text-gray-800">{userState.lastname}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Email</span>
                    <span className="font-semibold text-gray-800">{userState.email}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600 font-medium">Balance</span>
                    <span className="font-bold text-lg text-blue-600">₹{userState.balance}</span>
                  </div>
                </div>
              
              </div>
              
              {/* QR Code */}
              <div className="md:w-1/2 flex flex-col items-center">
                <h2 className="text-lg md:text-xl font-bold mb-6 text-gray-800 w-full border-b pb-2">
                  Your Payment QR Code
                </h2>
                
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                  <QRCodeCanvas value={`${userState.id}`} size={220} />
                </div>
                
                <p className="text-sm text-gray-500 mt-4 text-center max-w-xs">
                  Share this QR code to receive payments instantly from other CashFlow users
                </p>
                
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;