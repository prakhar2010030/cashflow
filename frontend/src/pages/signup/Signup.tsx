import BottomSignIn from "../../components/BottomSignIn";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import InputBox from "../../components/InputBox";
import SubHeading from "../../components/SubHeading";

const Signup = () => {
  const signUp = () => {};
  return (
    <div className="bg-slate-300 text-xl h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white  text-center p-2 h-max px-4">
          <Heading label="Sign up" />
          <SubHeading label="Enter your details to create an account" />
          <InputBox label="Email" placeholder="email@gmail.com..." />
          <InputBox label="First Name" placeholder="prakhar...." />
          <InputBox label="Last Name" placeholder="kumar..." />
          <InputBox label="Password" placeholder="1234@34sdfasf...min 6" />
          <div className="my-4">
            <Button label="Sign up" onClick={signUp} />
          </div>
          <BottomSignIn
            label="Already have an account?"
            buttonText="Sign in"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
