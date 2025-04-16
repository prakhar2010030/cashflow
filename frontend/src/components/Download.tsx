import React from "react";

const Download = () => {
  return (
    <div id="download" className="py-16 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Get CashFlow Today</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join millions of users who trust CashFlow for their daily payment
          needs. Download now and experience the future of digital payments.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button className="bg-black text-white flex items-center justify-center px-6 py-3 rounded-lg">
            <div className="mr-3">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 20.5C16.1421 20.5 19.5 17.1421 19.5 13C19.5 8.85786 16.1421 5.5 12 5.5C7.85786 5.5 4.5 8.85786 4.5 13C4.5 17.1421 7.85786 20.5 12 20.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs">Download on the</p>
              <p className="text-lg font-semibold">App Store</p>
            </div>
          </button>
          <button className="bg-black text-white flex items-center justify-center px-6 py-3 rounded-lg">
            <div className="mr-3">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 20.5C16.1421 20.5 19.5 17.1421 19.5 13C19.5 8.85786 16.1421 5.5 12 5.5C7.85786 5.5 4.5 8.85786 4.5 13C4.5 17.1421 7.85786 20.5 12 20.5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs">Get it on</p>
              <p className="text-lg font-semibold">Google Play</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Download;
