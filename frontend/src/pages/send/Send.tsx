
import  { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ArrowRight, Wallet,  } from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useToast } from '../../hooks/useToast';
import Toast from '../../components/Toast';
import Appbar from '../../components/AppBar';
import { useUserContext } from '../../contexts/UserContext';
import Loader from '../../components/Loader';
import { BiRupee } from 'react-icons/bi';

function Send() {
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
    setUsername(res.data.user.firstName);
  }, [state.id]);

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
        success("Transfer successful!");
        setAmount(0);
        setLoading(false);
      } catch (err) {
        console.error(err);
        error("Transaction failed");
        setLoading(false);
      }
    } else {
      error("Please enter an amount!");
    }
  };

  useEffect(() => {
    getReceiver();
  }, [getReceiver]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Appbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Send Money</h1>
            </div>

            {/* Recipient Info */}
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-xl font-semibold text-white uppercase">
                  {username ? username[0] : "?"}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Sending to</p>
                <h2 className="text-lg font-semibold text-gray-900 capitalize">
                  {username || "Loading..."}
                </h2>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Amount Input */}
            <div className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BiRupee className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="amount"
                    className="block w-full pl-10 pr-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ease-in-out"
                    placeholder="Enter amount"
                    value={amount === 0 ? "" : amount}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setAmount(Number(e.target.value))
                    }
                  />
                </div>
              </div>

              <button
                onClick={handleTransfer}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg font-medium hover:from-green-500 hover:to-blue-600 transition-all duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader />
                    <span className="ml-2">Processing...</span>
                  </div>
                ) : (
                  "Send Money"
                )}
              </button>
            </div>

            {/* Security Note */}
            <div className="text-center text-sm text-gray-500">
              <p>🔒 End-to-end encrypted transfer</p>
            </div>
          </div>
        </div>
      </div>
      <Toast toastState={toastState} onReset={reset} />
    </div>
  );
}

export default Send;
