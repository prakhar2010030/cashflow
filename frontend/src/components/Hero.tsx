import { QrCode, Send } from "lucide-react";

export default function Hero() {
  return (
    <div className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Payments Made Simple with CashFlow
              </h1>
              <p className="text-xl mb-8">
                Send money, pay bills, and shop anywhere with just your phone.
                Fast, secure, and hassle-free.
              </p>
              <div className="flex space-x-4">
                <button className="bg-white text-gray-600 px-6 py-3 rounded-lg font-medium">
                  Download Now
                </button>
                <button className="border border-white px-6 py-3 rounded-lg font-medium">
                  Learn More
                </button>
                </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-gray-500 p-4 rounded-xl shadow-xl w-64">
                <div className="bg-white rounded-lg p-6 flex flex-col items-center mb-4">
                  <QrCode className="h-16 w-16 text-gray-600 mb-4" />
                  <p className="text-gray-600 font-medium text-center">
                    Scan QR Code to Pay
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">Balance</p>
                    <p className="text-gray-800 font-bold text-xl">₹5,432.50</p>
                  </div>
                  <Send className="text-gray-600 h-6 w-6" />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
