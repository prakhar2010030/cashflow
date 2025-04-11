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
    <div className="bg-slate-300 md:text-xl h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white text-center p-2 h-max px-4">
          <Heading label="Sign up" />
          <SubHeading label="Enter your details to create an account" />
          <InputBox
            name="email"
            value={formState.email}
            label="Email"
            onChange={handleChange}
            placeholder="email@gmail.com..."
          />
          <InputBox
            name="firstname"
            value={formState.firstname}
            onChange={handleChange}
            label="First Name"
            placeholder="prakhar...."
          />
          <InputBox
            name="lastname"
            value={formState.lastname}
            onChange={handleChange}
            label="Last Name"
            placeholder="kumar..."
          />
          <InputBox
            name="password"
            value={formState.password}
            onChange={handleChange}
            label="Password"
            placeholder="1234@34sdfasf...min 6"
            type="password"
          />
          <div className="my-3 md:4">
            <Button label="Sign up" onClick={signUp} />
          </div>
          <BottomSignIn
            label="Already have an account?"
            buttonText="Sign in"
            to="/signin"
          />
        </div>
      </div>

      <Toast toastState={toastState} onReset={reset} />
    </div>
  );
};

export default Signup;
