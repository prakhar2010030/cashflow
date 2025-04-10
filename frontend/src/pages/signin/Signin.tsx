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
// import { useUserContext } from "../../contexts/UserContext";

const Signin = () => {
  const { updateLoginField, resetLoginEntry, loginStates } = useLogin();
  const { toastState, error, reset } = useToast();
  const { addItem } = useLocalStorage();
  const { navigateTo } = useNavigates();
  const {  setLoading } = useUserContext();

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
      addItem("token", res.data.token);
      resetLoginEntry();
      setLoading(false);
      navigateTo("/dashboard");
    } catch (err) {
      console.log(err);
      setLoading(false);
      error("login failed");
    }
  };

  return (
    <div className="bg-slate-300 md:text-xl h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white text-center p-2  ">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            name="email"
            value={loginStates.email}
            placeholder="prakhar@gmail.com"
            label={"Email"}
            onChange={handleChange}
          />
          <InputBox
            name="password"
            value={loginStates.password}
            placeholder="123456@fk.."
            label={"Password"}
            onChange={handleChange}
            type="password"
          />
          <div className="my-3 md:my-4">
            <Button label={"Sign in"} onClick={signin} />
          </div>
          <BottomSignIn
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/"}
          />
        </div>
      </div>
      <Toast toastState={toastState} onReset={reset} />
    </div>
  );
};

export default Signin;
