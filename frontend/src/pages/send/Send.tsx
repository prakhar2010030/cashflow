import axios from "axios";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import Toast from "../../components/Toast";
import Appbar from "../../components/AppBar";
import { useUserContext } from "../../contexts/UserContext";
import Loader from "../../components/Loader";

const Send = () => {
  const [amount, setAmount] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const { state } = useLocation();
  const { getItem } = useLocalStorage();
  const { success, error, toastState, reset } = useToast();
  const { loading, setLoading } = useUserContext();

  const getReceiver = useCallback(async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getUserName?id=${state.id}`,
      {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      }
    );
    // console.log("receiver ", res);
    setUsername(res.data.user.firstName);
  }, [state.id]);

  // console.log("state =>", state);

  const handleTransfer = async () => {
    if (amount > 0) {
      setLoading(true);
      try {
        await axios.post(
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
        // console.log(res);
        success("amount send");
        setAmount(0);
        setLoading(false);
      } catch (err) {
        console.log(err);
        error("transaction failed");
        setLoading(false);
      }
    }
    else error("enter amount!!!")
  };

  useEffect(() => {
    getReceiver();
  }, [getReceiver]);

  return (
    <>
      <Appbar />
      <div className="flex md:text-xl justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
          <div className=" md:max-w-md p-4 space-y-8  bg-white shadow-lg rounded-lg">
            <div className="flex flex-col space-y-1.5 ">
              <h2 className="text-xl md:text-3xl font-bold text-center">
                Transfer Money
              </h2>
            </div>
            <div className="">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="h-6 w-6 md:w-12 md:h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="md:text-2xl uppercase text-white">
                    {username ? username[0] : "N/A"}
                  </span>
                </div>
                <h3 className="md:text-2xl capitalize font-semibold">
                  Friend's Name : {username ? username : "N/A"}
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
                    className="flex my-2 md:h-10 w-full rounded-md border   p-2 md:px-3 md:py-2 text-md"
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
                  className="rounded-md text-md font-medium transition-colors h-10 md:px-4 md:py-2 w-full bg-green-500 text-white cursor-pointer"
                  disabled={loading}
                >
                  {loading ? <Loader /> : "Initiate Transfer"}
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
