
import { ChangeEvent, useCallback } from "react";
import axios from "axios";
import BottomSignIn from "../../components/BottomSignIn";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import InputBox from "../../components/InputBox";
import SubHeading from "../../components/SubHeading";
import { useToast } from "../../hooks/useToast";
import Toast from "../../components/Toast";
import { FormInterface, useSignup } from "../../hooks/useSignup";
import { useNavigates } from "../../hooks/useNavigates";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useUserContext } from "../../contexts/UserContext";

const Signup = () => {
  const { formState, updateField, resetSignup } = useSignup();
  const { toastState, error, reset } = useToast();
  const { navigateTo } = useNavigates();
  const { addItem } = useLocalStorage();
  const { setLoading } = useUserContext();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof FormInterface, value);
  }, []);

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        formState
      );
      // console.log(res);
      addItem("token", String(res.data.token));
      resetSignup();
      setLoading(false);
      navigateTo("/signin");
    } catch (err) {
      error("Sign up failed!");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 py-8 px-4 sm:px-6 lg:px-8">
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
        </div>
        
        {/* Form Section */}
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-6">
            <Heading label="Create your account" />
            <SubHeading label="Join CashFlow and experience seamless payments" />
          </div>
          
          <div className="space-y-4">
            <InputBox
              name="email"
              value={formState.email}
              label="Email"
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <InputBox
                name="firstname"
                value={formState.firstname}
                onChange={handleChange}
                label="First Name"
                placeholder="John"
              />
              <InputBox
                name="lastname"
                value={formState.lastname}
                onChange={handleChange}
                label="Last Name"
                placeholder="Doe"
              />
            </div>
            
            <InputBox
              name="password"
              value={formState.password}
              onChange={handleChange}
              label="Password"
              placeholder="Minimum 6 characters"
              type="password"
            />
            
            <div className="pt-4">
              <Button label="Create Account" onClick={signUp} />
            </div>
          </div>
          
          <div className="mt-6">
            <BottomSignIn
              label="Already have an account?"
              buttonText="Sign in"
              to="/signin"
            />
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="text-center text-sm text-white">
          <p>
            By signing up, you agree to our{" "}
            <a href="#" className="font-medium hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
      
      <Toast toastState={toastState} onReset={reset} />
    </div>
  );
};

export default Signup;