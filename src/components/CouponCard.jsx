import React, { useState, useEffect } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import Otherpayment from "./PaymentOptions";

const CouponCard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [message, setMessage] = useState("");

  const handleCopyCode = () => {
    navigator.clipboard.writeText("GETFREE5");
    setIsCopied(true);
  };

  const handleRedeem = () => {
    if (inputCode === "GETFREE5") {
      setIsRedeemed(true);
      setMessage("Coupon redeemed successfully!");
    } else {
      setIsRedeemed(false);
      setMessage("Invalid coupon code. Please try again.");
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="container mx-auto mt-14 p-4">
      <div className="flex flex-wrap justify-center gap-10">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-center py-10 px-6 sm:px-20 rounded-lg shadow-xl relative flex-grow max-w-md w-full">
          <div className="flex shrink-0 bg-white rounded-3xl justify-center py-4 shadow-md mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-customBlue"
            >
              <FaRegPaperPlane className="h-6 w-6 text-customGold animate-bounce" />
              <span>Paper.io</span>
            </Link>
          </div>
          <h3 className="text-2xl font-semibold my-4">
            Get 5 Credits Free to Find or Verify Emails
            <br />
            Using the Coupon Code Below
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span
              id="cpnCode"
              className="border-dashed border-2 border-white text-white px-4 py-2 rounded-l"
            >
              GETFREE5
            </span>
            <span
              id="cpnBtn"
              className={`border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer transition transform hover:scale-105 ${
                isCopied ? "bg-green-500 text-white" : ""
              }`}
              onClick={handleCopyCode}
            >
              {isCopied ? "Copied!" : "Copy Code"}
            </span>
          </div>
          <p className="text-sm">Valid Till: 02 Dec, 2024</p>

          <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6 shadow-lg"></div>
          <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6 shadow-lg"></div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white text-center py-10 px-6 sm:px-20 rounded-lg shadow-xl relative flex-grow max-w-md w-full">
          <h3 className="text-2xl font-semibold my-4">
            Enter Your Coupon Code
            <br />
            Here
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="px-4 py-2 rounded-l bg-white text-purple-600 border-2 border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Enter coupon code"
            />
            <button
              onClick={handleRedeem}
              className="px-4 py-2 bg-purple-600 text-white rounded-r border-2 border-purple-600 cursor-pointer transition transform hover:scale-105"
            >
              Redeem
            </button>
          </div>
          {message && (
            <p
              className={`text-lg ${
                isRedeemed ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6 shadow-lg"></div>
          <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6 shadow-lg"></div>
        </div>
      </div>
      <div className="mt-10">
        <Otherpayment />
      </div>
    </div>
  );
};

export default CouponCard;
