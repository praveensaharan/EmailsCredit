import React, { useState, useEffect } from "react";
import { FaRegPaperPlane, FaCopy, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useApi } from "../ContextApi/CreditsContext";
import { Spin, Alert, message as antdMessage } from "antd";

const CouponCard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [inputCode, setInputCode] = useState("");

  const { ReedemCoupon, loading } = useApi();

  const handleCopyCode = () => {
    navigator.clipboard.writeText("GETFREE5");
    setIsCopied(true);
    antdMessage.success("Coupon code copied to clipboard!");
  };

  const handleRedeem = async () => {
    try {
      const result = await ReedemCoupon(inputCode);
      if (result) {
        antdMessage.success(result); // Use the message returned from the ReedemCoupon function
      } else {
        antdMessage.error("Invalid coupon code. Please try again.");
      }
    } catch (error) {
      console.error("Error redeeming coupon:", error.message);

      antdMessage.error("An error occurred. Please try again.");
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
      <div className="flex flex-wrap justify-center gap-5">
        <div className="bg-gradient-to-br from-customBlue to-customLightBlue text-white text-center py-10 px-6 sm:px-20 rounded-lg shadow-xl relative flex-grow max-w-md w-full">
          <div className="flex shrink-0 bg-white rounded-3xl justify-center py-4 shadow-md mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-customBlue"
            >
              <FaRegPaperPlane className="h-6 w-6 text-customGold animate-bounce" />
              <span>EmailsCredits</span>
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
              className={`border border-white bg-white text-customBlue px-4 py-2 rounded-r cursor-pointer transition transform hover:scale-105 ${
                isCopied ? "text-customRed" : ""
              }`}
              onClick={handleCopyCode}
            >
              {isCopied ? <FaCheck /> : <FaCopy className="text-cyan-800" />}{" "}
            </span>
          </div>
          <p className="text-sm">Valid Till: 02 Dec, 2024</p>

          <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6 shadow-lg"></div>
          <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6 shadow-lg"></div>
        </div>

        <div className="bg-gradient-to-br from-customGold to-customLightGold text-white text-center py-10 px-6 sm:px-20 rounded-lg shadow-xl relative flex-grow max-w-md w-full">
          <h3 className="text-2xl font-semibold my-4">
            Enter Your
            <br />
            Coupon Code
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="px-4 py-2 rounded-l bg-white text-customBlue border-2 border-customBlue focus:outline-none focus:ring-2 focus:ring-customLightBlue transition"
              placeholder="Enter coupon code"
              disabled={loading}
            />
            <button
              onClick={handleRedeem}
              className="px-4 py-2 bg-customBlue text-white rounded-r border-2 border-customBlue cursor-pointer transition transform hover:scale-105"
              disabled={loading}
            >
              {loading ? <Spin /> : <>Redeem</>}
            </button>
          </div>

          <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6 shadow-lg"></div>
          <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6 shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
