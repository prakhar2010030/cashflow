import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import BottomSignIn from "../../components/BottomSignIn";

const Signin = () => {
  const signin = () => {};
  return (
    <div className="bg-slate-300 text-xl h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white  text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
          <InputBox placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={signin} />
          </div>
          <BottomSignIn
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
