import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import BottomSignIn from "../../components/BottomSignIn";
import { LoginState, useLogin } from "../../hooks/useSignIn";
import { ChangeEvent } from "react";
import axios from "axios";
import { useToast } from "../../hooks/useToast";
import Toast from "../../components/Toast";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigates } from "../../hooks/useNavigates";
import { useUserContext } from "../../contexts/UserContext";

const Signin = () => {
  const { updateLoginField, resetLoginEntry, loginStates } = useLogin();
  const { toastState, error, reset } = useToast();
  const { addItem } = useLocalStorage();
  const { navigateTo } = useNavigates();
  const { setLoading, setUserDetail } = useUserContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateLoginField(name as keyof LoginState, value);
  };
  
  const signin = async () => {
    // console.log(loginStates);
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        loginStates
      );
      // console.log(res.data);
      addItem("token", res.data.token);
      resetLoginEntry();
      setLoading(false);
      setUserDetail(res.data.userDetail);
      navigateTo("/dashboard");
    } catch (err) {
      console.log(err);
      setLoading(false);
      error("login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo Section */}
        <div className="text-center">
          <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto shadow-md">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-blue-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-white">CashFlow</h2>
        </div>
        
        {/* Form Section */}
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <Heading label="Welcome back" />
            <SubHeading label="Sign in to your CashFlow account" />
          </div>
          
          <div className="space-y-5">
            <InputBox
              name="email"
              value={loginStates.email}
              placeholder="your.email@example.com"
              label="Email"
              onChange={handleChange}
            />
            
            <InputBox
              name="password"
              value={loginStates.password}
              placeholder="Enter your password"
              label="Password"
              onChange={handleChange}
              type="password"
            />
            
            <div className="flex items-center justify-end">
              <button 
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            </div>
            
            <div className="pt-2">
              <Button label="Sign in" onClick={signin} />
            </div>
          </div>
          
          <div className="mt-6">
            <BottomSignIn
              label="Don't have an account?"
              buttonText="Sign up"
              to="/"
            />
          </div>
        </div>
        
        {/* Security Note */}
        <div className="text-center text-sm text-white flex items-center justify-center space-x-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
          <p>Secure login with end-to-end encryption</p>
        </div>
      </div>
      
      <Toast toastState={toastState} onReset={reset} />
    </div>
  );
};

export default Signin;