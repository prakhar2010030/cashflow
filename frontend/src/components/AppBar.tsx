import { Link } from "react-router-dom";

import { LogOut, Wallet } from "lucide-react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigates } from "../hooks/useNavigates";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppBar = () => {
  const { navigateTo } = useNavigates();
  const { userState } = useUserContext();
  const { clearLocalStorage } = useLocalStorage();

  const handleLogout = () => {
    const res = confirm("will be logged out!!");
    if (res) {
      clearLocalStorage();
      navigateTo("/");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-4 h-16 flex items-center justify-between shadow-sm">
      {/* Left side - Logo */}
      <Link 
        to="/dashboard" 
        className="text-purple-600 hover:text-purple-700 transition-colors"
      >
        <Wallet className="h-8 w-8 md:h-8 md:w-8" />
      </Link>

      {/* Right side - User Profile & Logout */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm md:text-base">Hello,</span>
        
        {/* User Avatar */}
        <button
          onClick={() => navigateTo("/profile")}
          className="flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
        >
          <span className="text-purple-700 font-medium text-sm md:text-base uppercase">
            {userState.firstname[0]}
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-gray-50"
        >
          <LogOut className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </nav>
  );
};

export default AppBar;
