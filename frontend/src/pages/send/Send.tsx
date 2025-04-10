import axios from "axios";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ChangeEvent, useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import Toast from "../../components/Toast";
import Appbar from "../../components/AppBar";

const Send = () => {
  const [amount, setAmount] = useState<number>(0);
  const [username,setUsername] = useState<string>("");
  const { state } = useLocation();
  const { getItem } = useLocalStorage();
  const { success, error, toastState, reset } = useToast();

  const getReceiver = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getUserName?id=${state.id}`,
      {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      }
    );
    // console.log("receiver ", res);
    setUsername(res.data.user.firstName)
  };

  // console.log("state =>", state);

  const handleTransfer = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/account/transfer`,
        {
          to: state.id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        }
      );
      console.log(res);
      success("amount send");
      setAmount(0);
    } catch (err) {
      console.log(err);
      error("transaction failed");
    }
  };

  useEffect(() => {
    getReceiver();
  }, [getReceiver]);

  return (
    <>
      <Appbar />
      <div className="flex text-xl justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
          <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 ">
              <h2 className="text-3xl font-bold text-center">Transfer Money</h2>
            </div>
            <div className="">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white">
                    {username ? username[0]:"N/A"}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold">
                  Friend's Name : {username ? username:"N/A"}
                </h3>
              </div>
              <div className="space-y-8 ">
                <div className="mt-4">
                  <label
                    className="text-md  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    type="number"
                    className="flex my-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-md"
                    id="amount"
                    placeholder="Enter amount"
                    value={amount === 0 ? "" : amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setAmount(Number(e.target.value))
                    }
                  />
                </div>
                <button
                  onClick={handleTransfer}
                  className="justify-center rounded-md text-md font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white cursor-pointer"
                >
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toast toastState={toastState} onReset={reset} />
      </div>
    </>
  );
};

export default Send;
