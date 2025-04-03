import { Link } from "react-router-dom";

interface BottomTextProps {
  label: string;
  buttonText: string;
  to: string;
}

const BottomSignIn = ({ label, buttonText, to }: BottomTextProps) => {
  return (
    <div className=" text-medium flex justify-center">
      <div>{label}</div>
      <Link className="pointer underline ml-2 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomSignIn;
